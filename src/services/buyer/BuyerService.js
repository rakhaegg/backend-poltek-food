const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exception/InvariantError');
const NotFoundError = require('../../exception/NotFoundError');
const AuthenticationError = require('../../exception/AuthenticationError');


class BuyersService{
    constructor(){
        this._pool = new Pool()
    }

    async addBuyer({ username, password, fullname }) {
        await this.verifyNewUsername(username);
        const id = `buyer-${nanoid(16)}`;
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = {
          text: 'INSERT INTO buyers VALUES($1, $2, $3, $4) RETURNING id',
          values: [id, username, hashedPassword, fullname],
        };
    
        const result = await this._pool.query(query);
    
        if (!result.rows.length) {
          throw new InvariantError('Buyer gagal ditambahkan');
        }
        return result.rows[0].id;
      }
      
    async verifyNewUsername(username) {
        const query = {
          text: 'SELECT username FROM buyers WHERE username = $1',
          values: [username],
        };
    
        const result = await this._pool.query(query);
    
        if (result.rows.length > 0) {
          throw new InvariantError('Gagal menambahkan buyer. Username sudah digunakan.');
        }
      }
    
      async getUserById(userId) {
        const query = {
          text: 'SELECT id, username, fullname FROM buyers WHERE id = $1',
          values: [userId],
        };
    
        const result = await this._pool.query(query);
    
        if (!result.rows.length) {
          throw new NotFoundError('Buyers tidak ditemukan');
        }
    
        return result.rows[0];
      }
    
      async verifyUserCredential(username, password) {
        const query = {
          text: 'SELECT id, password FROM buyers WHERE username = $1',
          values: [username],
        };
        console.log(username)
        const result = await this._pool.query(query);
        
        if (!result.rows.length) {
          throw new AuthenticationError('Kredensial yang Anda berikan salah');
        }
        
        const { id, password: hashedPassword } = result.rows[0];
    
        const match = await bcrypt.compare(password, hashedPassword);
    
        if (!match) {
          throw new AuthenticationError('Kredensial yang Anda berikan salah');
        }
    
        return id;
      }
}


module.exports = BuyersService