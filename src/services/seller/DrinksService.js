const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exception/InvariantError');
const NotFoundError = require('../../exception/NotFoundError');
const AuthorizationError = require('../../exception/AuthorizationError')
const fs = require('fs')
const Jimp = require("jimp");



class DrinkService{
    constructor(){
        this._pool = new Pool()
    }
    async addDrink(credentialId , {name , price , shops_id , image}){
        const id = "drink-" + nanoid(16);

        const createdAt = new Date().toISOString()
        const insertAt = createdAt;
        const nameFile  = `image/${credentialId}/shop/drink/${id}`
        const query = {
            text: 'INSERT INTO drinks VALUES($1, $2, $3 , $4 , $5 , $6 , $7) RETURNING id',
            values: [id, name , price , createdAt , insertAt , shops_id , nameFile],
        };
        const buffer = Buffer.from(image, "base64");
 
        const foldername  = `image/${credentialId}/shop/drink/`
        try {
            if (!fs.existsSync(foldername)) {
              fs.mkdirSync(foldername)
            }
          } catch (err) {
            console.error(err)
          }
        Jimp.read(buffer, (err, res) => {
            if (err) throw new Error(err);

            res.quality(5).write(`image/${credentialId}/shop/drink/${id}.jpg`);
        });
        const result = await this._pool.query(query)

        if (!result.rows[0].id) {
            throw new InvariantError('Drink failed added')
        }
        return result.rows[0].id;

    }

    async getDrink(owner){
        const query = {
            text: `SELECT  * FROM drinks
            WHERE shops_id = $1 `,
            values: [owner],
        };
        const result = await this._pool.query(query);
        const pathImage = result.rows[0].image
        
        if (!result.rows.length) {
            throw new NotFoundError('Drink tidak ditemukan');
        }
        const imageAsBase64 = fs.readFileSync(pathImage+'.jpg', 'base64');
        return result.rows.map(drink => ({id : drink.id , name : drink.name , price : drink.price  , image : imageAsBase64})) 
    }
    async updateDrink(id , {name , price}){
        const updatedAt = new Date().toISOString();
        if (name == null){
            const query = {
                text: 'UPDATE drinks SET price = $1, updated_at = $2 WHERE id = $3 RETURNING id',
                values: [price, updatedAt, id],
            };
            const result = await this._pool.query(query);

            if (!result.rows.length) {
                throw new NotFoundError('Gagal memperbarui shops. Id tidak ditemukan');
            }
        }else if (price == null){
            const query = {
                text: 'UPDATE drinks SET name = $1, updated_at = $2 WHERE id = $3 RETURNING id',
                values: [name, updatedAt, id],
            };
            const result = await this._pool.query(query);

            if (!result.rows.length) {
                throw new NotFoundError('Gagal memperbarui shops. Id tidak ditemukan');
            }
        }else{
            const query = {
                text: 'UPDATE drinks SET name = $1, price = $2 , updated_at = $3 WHERE id = $4 RETURNING id',
                values: [name,price, updatedAt, id],
            };
            const result = await this._pool.query(query);

            if (!result.rows.length) {
                throw new NotFoundError('Gagal memperbarui shops. Id tidak ditemukan');
            }
        }
    }
    async deleteDrink(id , idShop){
        const query = {
            text: 'DELETE FROM drinks WHERE id = $1 RETURNING id',
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

module.exports   = DrinkService