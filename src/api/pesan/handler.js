const ClientError = require('../../exception/ClientError')


class PesanHandler{
    constructor(service ){
        this._service = service;

        this.postOrderHanlder = this.postOrderHanlder.bind(this)
        this.getOrderByIdHandler = this.getOrderByIdHandler.bind(this)
        this.putOrderByIdHandler = this.putOrderByIdHandler.bind(this)
    }


    async postOrderHanlder(request , h){
        try {
            const { buyer_id, shop_id, daftar , total , daftar_drink} = request.payload;
            const pesanId = await this._service.addPesan({
                buyer_id, shop_id, daftar,total , daftar_drink
            });
            
            const response = h.response({
                status: 'success',
                message: 'Pesanan berhasil ditambahkan',
                data: {
                    pesanId,
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
    async getOrderByIdHandler(request , h){
        try {

            const { id } = request.params;
            const user = await this._service.getPesanForBuyer(id);
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
    async putOrderByIdHandler(request , h){
        try {
            
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
}
module.exports = PesanHandler