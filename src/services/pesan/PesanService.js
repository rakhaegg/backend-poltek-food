const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exception/InvariantError');
const NotFoundError = require('../../exception/NotFoundError');
const AuthenticationError = require('../../exception/AuthenticationError');
const fs = require('fs')




class PesanService {
    constructor() {
        this._pool = new Pool();
    }


    async addPesan({buyer_id , shop_id ,  daftar , total , daftar_drink , nama_toko , alamat_buyer , alamat_toko}){
        const id = `order-${nanoid(16)}`;
        const query = {
            text: 'INSERT INTO orders VALUES($1, $2, $3, $4 , $5 , $6 , $7 , $8 , $9 , $10 , $11 , $12 , $13) RETURNING id',
            values: [id, buyer_id, shop_id, "" ,"" , "",  "" , daftar ,total , daftar_drink , nama_toko , alamat_buyer , alamat_toko],
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
        return result.rows.map(pesan => ({ id: pesan.id, buyer_id: pesan.buyer_id, shop_id : pesan.shop_id , driver_id : pesan.driver_id ,
        status_shop : pesan.status_shop , status_driver : pesan.status_driver , status_buyer : pesan.status_buyer , daftar : pesan.daftar , 
        total : pesan.total , daftar_drink : pesan.daftar_drink , nama_toko : pesan.nama_toko , alamat_buyer : pesan.alamat_buyer , alamat_toko :pesan.alamat_toko
        }))

    }
    async getOrderForDriver(){
        const query = {
            text: 'SELECT * FROM orders '
        }
        const result = await this._pool.query(query)
        if (!result.rows.length) {
            throw new NotFoundError('Pesan tidak ditemukan');
        }
        return result.rows.map(pesan => ({ id: pesan.id, buyer_id: pesan.buyer_id, shop_id : pesan.shop_id , driver_id : pesan.driver_id ,
        status_shop : pesan.status_shop , status_driver : pesan.status_driver , status_buyer : pesan.status_buyer , daftar : pesan.daftar , 
        total : pesan.total , daftar_drink : pesan.daftar_drink , nama_toko : pesan.nama_toko , alamat_buyer : pesan.alamat_buyer , alamat_toko :pesan.alamat_toko
        }))
    }
    async getOrderForSeller(id) {
        const query = {
            text: 'SELECT * FROM orders WHERE shop_id  = $1',
            values: [id]
        }
        const result = await this._pool.query(query)
        if (!result.rows.length) {
            throw new NotFoundError('Pesan tidak ditemukan');
        }
        return result.rows.map(pesan => ({ id: pesan.id, buyer_id: pesan.buyer_id, shop_id : pesan.shop_id , driver_id : pesan.driver_id ,
        status_shop : pesan.status_shop , status_driver : pesan.status_driver , status_buyer : pesan.status_buyer , daftar : pesan.daftar , 
        total : pesan.total , daftar_drink : pesan.daftar_drink , nama_toko : pesan.nama_toko , alamat_buyer : pesan.alamat_buyer , alamat_toko :pesan.alamat_toko
        }))
    }
    async updateDataForDriver(id , id_driver){
        const query = {
            text: 'UPDATE orders SET driver_id  = $1 WHERE id = $2 RETURNING id',
            values: [id_driver , id],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Gagal memperbarui pesan. Id tidak ditemukan');
        }
    }
    async updateForSeller(id , data){
        const query = {
            text: 'UPDATE orders SET status_shop  = $1 WHERE id = $2 RETURNING id',
            values: [data , id],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Gagal memperbarui pesan. Id tidak ditemukan');
        }
    }
    async updateDataForBuyer(id , data){
        const query = {
            text: 'UPDATE orders SET status_buyer   = $1 WHERE id = $2 RETURNING id',
            values: [data , id],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Gagal memperbarui pesan. Id tidak ditemukan');
        }
    }
    async getNameShopForOrder(id) {
        const query = {
            text: 'SELECT * FROM shops WHERE id = $1',
            values: [id]
        }
        const result = await this._pool.query(query)

        if (!result.rows.length) {
            throw new NotFoundError('Toko tidak ditemukan');
        }
        return result.rows.map(shop => ({ id: shop.id, name: shop.name, address: shop.address, no_phone: shop.no_phone, image: fs.readFileSync(shop.image + '.jpg', 'base64') }))
    }

}
module.exports = PesanService;