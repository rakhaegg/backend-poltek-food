const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exception/InvariantError');
const NotFoundError = require('../../exception/NotFoundError');
const AuthorizationError = require('../../exception/AuthorizationError')
const fs = require('fs')
const Jimp = require("jimp");


class ShopsService {
    constructor() {
        this._pool = new Pool()
    }

    async checkShop(credentialId)  {
        console.log(credentialId)
        const query = {
            text: 'SELECT * FROM shops WHERE owner = $1',
            values: [credentialId]
        }
        const result = await this._pool.query(query)
        if (!result.rows.length) {
            throw new NotFoundError('Shop tidak ditemukan');
        }
        return result.rows.map(shop => ({id : shop.id}))
    }

    async addShop({ name, address, no_phone, owner, image }) {
        const queryToCheckOwner = {
            text: 'SELECT * FROM shops WHERE name = $1',
            values: [name]
        }
        const resultCheckOwner = await this._pool.query(queryToCheckOwner)

        if (resultCheckOwner.rows.length > 0) {
            throw new InvariantError('Toko Telah Ada')
        }

        const id = "shop-" + nanoid(16);

        const createdAt = new Date().toISOString()
        const updatedAt = createdAt;

        const nameFile = `image/${owner}/shop/${id}`


        const query = {
            text: 'INSERT INTO shops VALUES($1, $2, $3, $4, $5, $6 , $7 , $8) RETURNING id',
            values: [id, name, address, no_phone, createdAt, updatedAt, owner, nameFile],
        };
        const buffer = Buffer.from(image, "base64");
        const foldername = `image/${owner}/shop/`
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

            res.quality(5).write(`image/${owner}/shop/${id}.jpg`);
        });
        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Toko gagal ditambahkan');
        }

        return result.rows[0].id;
    }
    async getShops(owner) {

        const query = {
            text: 'SELECT * FROM shops'
        }
        const result = await this._pool.query(query)
        if (!result.rows.length) {
            throw new NotFoundError('Shop tidak ditemukan');
        }
  

        return result.rows.map(shop => ({ id: shop.id, name: shop.name, address: shop.address, no_phone: shop.no_phone, image: fs.readFileSync(shop.image + '.jpg', 'base64') }))
    }
    async getShopById(owner) {
        const query = {
            text: 'SELECT * FROM shops WHERE id = $1',
            values: [owner]
        }
        const result = await this._pool.query(query)
        if (!result.rows.length) {
            throw new NotFoundError('Shop tidak ditemukan');
        }
        const pathImage = result.rows.image
            
        const imageAsBase64 = fs.readFileSync(pathImage + '.jpg', 'base64');
        return result.rows.map(shop => ({ id: shop.id, name: shop.name, no_phone: shop.no_phone, address : shop.address , image: imageAsBase64 }))
    }

    async editShosById(id,credentialId,  { name, address, no_phone, image }) {
        const updatedAt = new Date().toISOString();
        const checkImagequery = {
            text: `SELECT  * FROM shops
            WHERE id = $1 `,
            values: [id],
        };
        const resultCheckImageQuery = await this._pool.query(checkImagequery);
        const pathImageCheckImageQuery = resultCheckImageQuery.rows[0].image   

        const imageAsBase64 = fs.readFileSync(pathImageCheckImageQuery+'.jpg', 'base64');
        if (image == ""){
            console.log("asd")

            const query = {
                text: 'UPDATE shops SET name = $1, address = $2 , no_phone = $3 ,  updated_at = $4 WHERE id = $5 RETURNING id',
                values: [name, address, no_phone , updatedAt , id],
            };
            const result = await this._pool.query(query);
    
            if (!result.rows.length) {
                throw new NotFoundError('Gagal memperbarui shops. Id tidak ditemukan');
            }
    
        }else{
            const buffer = Buffer.from(image, "base64");
            
            fs.unlink(`image/${credentialId}/shop/${id}.jpg` , (err) => {
                if (err) throw err ;
                console.log(err)
            })

            Jimp.read(buffer, (err, res) => {
                if (err) throw new Error(err);
    
                res.quality(5).write(`image/${credentialId}/shop/${id}.jpg`);
            });
            const nameFile  = `image/${credentialId}/shop/${id}`

            const query = {
                text: 'UPDATE shops SET name = $1, address = $2 , no_phone = $3 , image = $4 , updated_at = $5 WHERE id = $6 RETURNING id',
                values: [name,address , no_phone, nameFile,updatedAt ,  id],
            };
            const result = await this._pool.query(query);
    
            if (!result.rows.length) {
                throw new NotFoundError('Gagal memperbarui shops. Id tidak ditemukan');
            }
        }
       

    }

    async deleteShopById(id) {
        const query = {
            text: 'DELETE FROM shops WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('toko gagal dihapus. Id tidak ditemukan');
        }
    }
    async verifyShopOwner(id, owner) {
        const query = {
            text: 'SELECT * FROM shops WHERE id = $1',
            values: [id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('TOKO tidak ditemukan');
        }
        const note = result.rows[0];
        if (note.owner !== owner) {
            throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
        }
    }

}

module.exports = ShopsService