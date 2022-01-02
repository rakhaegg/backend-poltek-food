const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exception/InvariantError');
const NotFoundError = require('../../exception/NotFoundError');
const AuthenticationError = require('../../exception/AuthenticationError');




class PesanService {
    constructor() {
        this._pool = new Pool();
    }


    async addPesan({buyer_id , shop_id ,  daftar , total , daftar_drink}){
        const id = `order-${nanoid(16)}`;
        const query = {
            text: 'INSERT INTO orders VALUES($1, $2, $3, $4 , $5 , $6 , $7 , $8 , $9 , $10 ) RETURNING id',
            values: [id, buyer_id, shop_id, "" ,"" , "",  "" , daftar ,total , daftar_drink],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError('Pesan gagal ditambahkan');
        }
        return result.rows[0].id;
    }
    async getPesanForBuyer(id){
        const query = {
            text: 'SELECT * FROM orders WHERE buyer_id = $1',
            values: [id]
        }
        const result = await this._pool.query(query)
        if (!result.rows.length) {
            throw new NotFoundError('Pesan tidak ditemukan');
        }
        return result.rows.map(pesan => ({ id: pesan.id, buyer_id: pesan.buyer_id, shop_id : pesan.shop_id , driver_id : pesan.driver_id }))

    }
    async updatePesan(){

    }

}
module.exports = PesanService;