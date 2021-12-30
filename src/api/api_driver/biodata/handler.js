const ClientError = require('../../../exception/ClientError')


class BiodataHandler {
    constructor(service_driver, service_biodata, validator) {
        this._service_driver = service_driver
        this._service_biodata = service_biodata
        this._validator = validator


        this.postBiodataHandler = this.postBiodataHandler.bind(this)
        this.getBiodataByIdHandler = this.getBiodataByIdHandler.bind(this)
        this.putBiodataHandler = this.putBiodataHandler.bind(this)
    }

    async postBiodataHandler(request, h) {
        try {
            this._validator.validateBiodataPayload(request.payload)
            const { username } = request.params
            const {  no_hp, image  , alamat} = request.payload
            const { id: credentialId } = request.auth.credentials;
            await this._service_driver.verifyDriver(username, credentialId)
            console.log(username)
            const foodId = await this._service_biodata.addBiodata({ username, no_hp, image , alamat , credentialId })

            const response = h.response({
                status: 'success',
                message: 'Driver berhasil ditambahkan',
                data: {
                    foodId,
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


    async getBiodataByIdHandler(request , h ) {

        try {
            
            const { id: credentialId } = request.auth.credentials;
            const { username } = request.params
    
            await this._service_driver.verifyDriver(username, credentialId)
    
            const food = await this._service_biodata.getBiodata(username);
            return {
                status: 'success',
                data: {
                    food,
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
            const response = h.response({
                status: 'fail',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(400);
            console.error(error);
        }
       
    }

    async putBiodataHandler(request , h) {
        try {
            const { id: credentialId } = request.auth.credentials;
            const { username } = request.params
            const { id , no_hp, image  , alamat} = request.payload
            await this._service_driver.verifyDriver(username, credentialId)
            
            
            const shopId = await this._service_biodata.updateBiodata( credentialId , id  , no_hp , image , alamat)
            
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
            const response = h.response({
                status: 'fail',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(400);
            console.error(error);
        }
    }
   
    
}
module.exports = BiodataHandler