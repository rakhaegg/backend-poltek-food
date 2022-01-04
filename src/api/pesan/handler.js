const ClientError = require('../../exception/ClientError')


class PesanHandler{
    constructor(service ){
        this._service = service;

        this.postOrderHanlder = this.postOrderHanlder.bind(this)
        this.getOrderByIdHandler = this.getOrderByIdHandler.bind(this)
        this.putOrderByIdHandler = this.putOrderByIdHandler.bind(this)
        this.getNameShopByIdForOrderHandler = this.getNameShopByIdForOrderHandler.bind(this)
        this.getOrderDriver = this.getOrderDriver.bind(this)
        this.getOrderForSeller = this.getOrderForSeller.bind(this)
        this.putDataToOrderFromDriverHandler = this.putDataToOrderFromDriverHandler.bind(this)
        this.putDataToOrderFromSellerHandler = this.putDataToOrderFromSellerHandler.bind(this)
        this.putDataToOrderFromBuyerHandler = this.putDataToOrderFromBuyerHandler.bind(this)
    }
    async putDataToOrderFromBuyerHandler(request , h){
        try {
            const { data } = request.payload
            const { id } = request.params
            await  this._service.updateDataForBuyer(id , data)
            
            
            const response = h.response({
                status: 'success',
                message : 'Pesan Berhasil DiUpdate'
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
    async putDataToOrderFromSellerHandler(request , h){
        try {
            const { data } = request.payload
            const { id } = request.params
            await  this._service.updateForSeller(id , data)
            
            
            const response = h.response({
                status: 'success',
                message : 'Pesan Berhasil DiUpdate'
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

    async putDataToOrderFromDriverHandler(request , h){
        try {
            const { id_driver } = request.payload
            const { id } = request.params
            await  this._service.updateDataForDriver(id , id_driver)
            
            
            const response = h.response({
                status: 'success',
                message : 'Pesan Berhasil DiUpdate'
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
    async getOrderForSeller(request , h){
        try {
            const {id} = request.params
            const user = await  this._service.getOrderForSeller(id)
           const response = h.response({
            status: 'success',
            data: {
                user,
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
    
    async getOrderDriver(request , h){
        try {
           const user = await  this._service.getOrderForDriver()

           const response = h.response({
            status: 'success',
            data: {
                user,
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
    async getNameShopByIdForOrderHandler (request , h ){
        try {
            const {id} = request.params;
           const user = await  this._service.getNameShopForOrder(id)

           const response = h.response({
            status: 'success',
            data: {
                user,
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
    async postOrderHanlder(request , h){
        try {
            const { buyer_id, shop_id, daftar , total , daftar_drink , nama_toko , alamat_buyer , alamat_toko} = request.payload;
            const pesanId = await this._service.addPesan({
                buyer_id, shop_id, daftar,total , daftar_drink , nama_toko , alamat_buyer , alamat_toko
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