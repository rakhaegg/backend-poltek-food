const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const Jimp = require("jimp");
const InvariantError = require('../../exception/InvariantError');
const NotFoundError = require('../../exception/NotFoundError');
const AuthorizationError = require('../../exception/AuthorizationError')
const fs = require('fs');
const biodata = require('../../api/api_driver/biodata');

class BiodataService {
    constructor() {
        this._pool = new Pool()
    }

    async addBiodata({ username, no_hp, image , alamat , credentialId,  }) {

        const id = "biodata-" + nanoid(16);
        const createdAt = new Date().toISOString()
        const insertAt = createdAt;
        const nameFile  = `image/${credentialId}/biodata/${id}`
 
        const query = {
            text: 'INSERT INTO biodata VALUES($1, $2, $3 , $4 , $5 , $6 , $7 , $8) RETURNING id',
            values: [id, username, no_hp, nameFile , alamat , credentialId , createdAt, insertAt],
        };
        const buffer = Buffer.from(image, "base64");
        
        const foldername  = `image/${credentialId}/biodata/`
        console.log(foldername);
        try {
            if (!fs.existsSync(foldername)) {
              fs.mkdirSync(foldername)
            }
          } catch (err) {
            console.error(err)
          }
          console.log("asd");
        Jimp.read(buffer, (err, res) => {
            if (err) throw new Error(err);

            res.quality(5).write(`image/${credentialId}/biodata/${id}.jpg`);
        });
        const result = await this._pool.query(query)

        if (!result.rows[0].id) {
            throw new InvariantError('Food failed added')
        }
        return result.rows[0].id;

    }

    async getBiodata(username) {
        const query = {
            text: `SELECT  * FROM biodata
            WHERE name = $1 `,
            values: [username],
        };
        const result = await this._pool.query(query);


        const pathImage = result.rows[0].image   
        if (!result.rows.length) {
            throw new NotFoundError('Food tidak ditemukan');
        }
        const imageAsBase64 = fs.readFileSync(pathImage+'.jpg', 'base64');

        return result.rows.map(biodata => ({ id: biodata.id, name: biodata.name, no_hp: biodata.no_hp , image: imageAsBase64 , alamat : biodata.alamat }))
    }

    async updateBiodata(credentialId ,  id , no_hp ,image , alamat ) {
        const updatedAt = new Date().toISOString();

        const checkImagequery = {
            text: `SELECT  * FROM biodata
            WHERE id = $1 `,
            values: [id],
        };
        const resultCheckImageQuery = await this._pool.query(checkImagequery);
        const pathImageCheckImageQuery = resultCheckImageQuery.rows[0].image   

        const imageAsBase64 = fs.readFileSync(pathImageCheckImageQuery+'.jpg', 'base64');

        if (imageAsBase64 == image){
            const query = {
                text: 'UPDATE biodata SET no_hp = $1 , alamat = $2 , updated_at = $3 WHERE id = $4 RETURNING id',
                values: [no_hp , alamat ,  updatedAt, id],
            };
            const result = await this._pool.query(query);
    
            if (!result.rows.length) {
                throw new NotFoundError('Gagal memperbarui shops. Id tidak ditemukan');
            }
        }else{
            const buffer = Buffer.from(image, "base64");
            
            fs.unlink(`image/${credentialId}/biodata/${id}.jpg` , (err) => {
                if (err) throw err ;
                console.log(err)
            })

            Jimp.read(buffer, (err, res) => {
                if (err) throw new Error(err);
    
                res.quality(5).write(`image/${credentialId}/biodata/${id}.jpg`);
            });
            const nameFile  = `image/${credentialId}/biodata/${id}`

            const query = {
                text: 'UPDATE biodata SET no_hp = $1, alamat = $2 , image = $3 , updated_at = $4 WHERE id = $5 RETURNING id',
                values: [no_hp , alamat , nameFile ,  updatedAt, id  ],
            };
            const result = await this._pool.query(query);
    
            if (!result.rows.length) {
                throw new NotFoundError('Gagal memperbarui shops. Id tidak ditemukan');
            }
        }

        
        
    }

    async deleteBiodata(id , idShop) {
        const query = {
            text: 'DELETE FROM foods WHERE id = $1 RETURNING id',
            values: [id],
        };
        fs.unlink(`image/${idShop}/food/${id}.jpg` , (err) => {
            if (err) throw err ;
            console.log(err)
        })
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('food gagal dihapus. Id tidak ditemukan');
        }
    }


}

module.exports = BiodataService