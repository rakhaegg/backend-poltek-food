const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const Jimp = require("jimp");
const InvariantError = require('../../exception/InvariantError');
const NotFoundError = require('../../exception/NotFoundError');
const AuthorizationError = require('../../exception/AuthorizationError')
const fs = require('fs')

class FoodService {
    constructor() {
        this._pool = new Pool()
    }

    async addFood(credentialId , { name, price, shops_id, image }) {

        const id = "food-" + nanoid(16);
        const createdAt = new Date().toISOString()
        const insertAt = createdAt;
        const nameFile  = `image/${credentialId}/shop/food/${id}`
        const query = {
            text: 'INSERT INTO foods VALUES($1, $2, $3 , $4 , $5 , $6 , $7) RETURNING id',
            values: [id, name, price, createdAt, insertAt, shops_id, nameFile],
        };
        const buffer = Buffer.from(image, "base64");
        
        const foldername  = `image/${credentialId}/shop/food/`
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

            res.quality(5).write(`image/${credentialId}/shop/food/${id}.jpg`);
        });
        const result = await this._pool.query(query)

        if (!result.rows[0].id) {
            throw new InvariantError('Food failed added')
        }
        return result.rows[0].id;

    }

    async getFood(owner) {
        const query = {
            text: `SELECT  * FROM foods
            WHERE shops_id = $1 `,
            values: [owner],
        };
        const result = await this._pool.query(query);


        const pathImage = result.rows[0].image   
        if (!result.rows.length) {
            throw new NotFoundError('Food tidak ditemukan');
        }
        const imageAsBase64 = fs.readFileSync(pathImage+'.jpg', 'base64');

        return result.rows.map(food => ({ id: food.id, name: food.name, price: food.price , image: imageAsBase64 }))
    }
    async getFoodById(owner) {
        console.log(owner)

        const query = {
            text: `SELECT  * FROM foods
            WHERE shops_id = $1 `,
            values: [owner],
        };

        const result = await this._pool.query(query);
        console.log(result)


        const pathImage = result.rows[0].image   
        if (!result.rows.length) {
            throw new NotFoundError('Food tidak ditemukan');
        }
        const imageAsBase64 = fs.readFileSync(pathImage+'.jpg', 'base64');

        return result.rows.map(food => ({ id: food.id, name: food.name, price: food.price , image: imageAsBase64 }))
    }

    async updateFood(id, credentialId,  { name, price , image , id_shop}) {
        const updatedAt = new Date().toISOString();
        console.log(id)

        const checkImagequery = {
            text: `SELECT  * FROM foods
            WHERE id = $1 `,
            values: [id],
        };
        const resultCheckImageQuery = await this._pool.query(checkImagequery);
        const pathImageCheckImageQuery = resultCheckImageQuery.rows[0].image   

        const imageAsBase64 = fs.readFileSync(pathImageCheckImageQuery+'.jpg', 'base64');

        if (imageAsBase64 == image){
            const query = {
                text: 'UPDATE foods SET name = $1, price = $2 ,  updated_at = $3 WHERE id = $4 RETURNING id',
                values: [name,price ,  updatedAt, id],
            };
            const result = await this._pool.query(query);
    
            if (!result.rows.length) {
                throw new NotFoundError('Gagal memperbarui shops. Id tidak ditemukan');
            }
        }else{
            const buffer = Buffer.from(image, "base64");
            
            fs.unlink(`image/${credentialId}/shop/food/${id}.jpg` , (err) => {
                if (err) throw err ;
                console.log(err)
            })

            Jimp.read(buffer, (err, res) => {
                if (err) throw new Error(err);
    
                res.quality(5).write(`image/${credentialId}/shop/food/${id}.jpg`);
            });
            const nameFile  = `image/${credentialId}/shop/food/${id}`

            const query = {
                text: 'UPDATE foods SET name = $1, price = $2 , image = $3 , updated_at = $4 WHERE id = $5 RETURNING id',
                values: [name,price , nameFile, updatedAt, id],
            };
            const result = await this._pool.query(query);
    
            if (!result.rows.length) {
                throw new NotFoundError('Gagal memperbarui shops. Id tidak ditemukan');
            }
        }

        
        
    }

    async deleteFood(id , credentialId) {
        const query = {
            text: 'DELETE FROM foods WHERE id = $1 RETURNING id',
            values: [id],
        };
        fs.unlink(`image/${credentialId}/shop/food/${id}.jpg` , (err) => {
            if (err) throw err ;
            console.log(err)
        })
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('food gagal dihapus. Id tidak ditemukan');
        }
    }


}

module.exports = FoodService