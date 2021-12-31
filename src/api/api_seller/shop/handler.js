const ClientError = require('../../../exception/ClientError')

class ShopHandler {
    constructor(service, validator) {
        this._service = service
        this._validator = validator

        this.postShopHandler = this.postShopHandler.bind(this)
        this.getShopHandler = this.getShopHandler.bind(this)
        this.getShopByIdHandler = this.getShopByIdHandler.bind(this)
        this.putShopByIdHandler = this.putShopByIdHandler.bind(this)
        this.deleteShopByIdHandler = this.deleteShopByIdHandler.bind(this)
        this.checkShopHandler = this.checkShopHandler.bind(this)
    }

    async checkShopHandler(request , h){
        try{
   
            const { id: credentialId } = request.auth.credentials;
            const shopId = await this._service.checkShop(credentialId)
            
             const response = h.response({
                status: 'success',
                message: 'Toko Suda Ada',
                data: {
                    shopId,
                },
            });
            response.code(201);
            return response;
        }catch(error){  
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
    async postShopHandler(request, h) {
        try {
            this._validator.validateShopPayload(request.payload);
            const { name, address, no_phone, image } = request.payload;
            const { id: credentialId } = request.auth.credentials;

            const shopId = await this._service.addShop({
                name, address, no_phone, owner: credentialId, image
            });

            const response = h.response({
                status: 'success',
                message: 'Toko berhasil ditambahkan',
                data: {
                    shopId,
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

    async getShopHandler(request) {
        const { id: credentialId } = request.auth.credentials;
        const user = await this._service.getShops();
        return {
            status: 'success',
            data: {
                user,
            },
        };
    }
    async getShopByIdHandler(request, h) {
        try {
            const { id } = request.params;
            const user = await this._service.getShopById(id);
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
    async putShopByIdHandler(request , h) {
      
        try {
            const { id: credentialId } = request.auth.credentials;
            const { id } = request.params
            
            await this._service.verifyShopOwner(id  ,credentialId)
            const shopId = await this._service.editShosById(id , credentialId ,  request.payload)
            const response = h.response({
                status: 'success',
                message: 'Toko berhasil DiUpdate',
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
    async deleteShopByIdHandler(request , h) {
        try {
            const { id: credentialId } = request.auth.credentials;
            const { id } = request.params

            await this._service.verifyShopOwner(id  ,credentialId)
            await this._service.deleteShopById(id)
            const response = h.response({
                status: 'success',
                message: 'Toko berhasil Dihapus',
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
}
module.exports = ShopHandler