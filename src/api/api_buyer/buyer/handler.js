
const ClientError = require('../../../exception/ClientError')
class BuyerUserHandler{
    constructor(service , validator){
        this._service = service
        this._validator = validator


        this.postBuyerUserHandler = this.postBuyerUserHandler.bind(this)
        this.getBuyerUserHandler = this.getBuyerUserHandler.bind(this)
        
    }


    async postBuyerUserHandler(request , h){
        try {
            this._validator.validateBuyerPayload(request.payload);
            const { username, password, fullname } = request.payload;
      
            const userId = await this._service.addBuyer({ username, password, fullname });
      
            const response = h.response({
              status: 'success',
              message: 'Buyer berhasil ditambahkan',
              data: {
                userId,
              },
            });
            response.code(201);
            return response;
          } catch (error) {
            if (error instanceof ClientError) {
              const response = h.response({
                status: 'fail',
                message: error.message,
              });
              response.code(error.statusCode);
              return response;
            }
      
            // Server ERROR!
            const response = h.response({
              status: 'error',
              message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
          }
    }
    async getBuyerUserHandler(request, h){
        try {
            const { id } = request.params;
            const user = await this._service.getUserById(id);
            return {
              status: 'success',
              data: {
                user,
              },
            };
          } catch (error) {
            if (error instanceof ClientError) {
              const response = h.response({
                status: 'fail',
                message: error.message,
              });
              response.code(error.statusCode);
              return response;
            }
      
            // server ERROR!
            const response = h.response({
              status: 'error',
              message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
          }
    }
}
module.exports = BuyerUserHandler