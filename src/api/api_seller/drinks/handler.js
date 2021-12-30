const ClientError = require('../../../exception/ClientError')


class DrinkHandler{
    constructor(service_shop, service_drink, validator) {
        this._service_shop = service_shop
        this._service_drink = service_drink
        this._validator = validator
        
        this.postDrinkHandler = this.postDrinkHandler.bind(this)
        this.getDrinkHandler = this.getDrinkHandler.bind(this)
        this.putDrinkHandler = this.putDrinkHandler.bind(this)
        this.deleteDrinksHandler = this.deleteDrinksHandler.bind(this)
    
    }

    async postDrinkHandler(request , h){
        try {
            this._validator.validateDrinkPayload(request.payload)

            const { name, price  , image} = request.payload
            const { id: credentialId } = request.auth.credentials;
            const { id: shops_id } = request.params

            await this._service_shop.verifyShopOwner(shops_id, credentialId)

            const foodId = await this._service_drink.addDrink(credentialId , { name, price, shops_id , image })

            const response = h.response({
                status: 'success',
                message: 'Makanan berhasil ditambahkan',
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
    async getDrinkHandler(request , h){
        try {
            const { id: credentialId } = request.auth.credentials;
            const { id: shops_id } = request.params
    
            await this._service_shop.verifyShopOwner(shops_id, credentialId)
    
            const drink = await this._service_drink.getDrink(shops_id);
            return {
                status: 'success',
                data: {
                    drink,
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
    async putDrinkHandler(request , h){
        try {
            const { id: credentialId } = request.auth.credentials;
            const { id } = request.params
            const {id_shop , name , price} = request.payload

            await this._service_shop.verifyShopOwner(id_shop, credentialId)
            const shopId = await this._service_drink.updateDrink(id ,{name , price})
            const response = h.response({
                status: 'success',
                message: 'Minuman berhasil DiUpdate',
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
    async deleteDrinksHandler(request , h){
        try {
            const { id: credentialId } = request.auth.credentials;
            const { id } = request.params
            const {id_shop } = request.payload
            await this._service_shop.verifyShopOwner(id_shop  ,credentialId)
            await this._service_drink.deleteDrink(id , id_shop)
            const response = h.response({
                status: 'success',
                message: 'Minuman Berhasil Dihapus',
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
module.exports = DrinkHandler