

require('dotenv').config()

const Hapi = require('@hapi/hapi')
const Jwt = require('@hapi/jwt')


//Seller
const authenticationsSeller = require('./api/api_seller/authentications')
const users = require('./api/api_seller/users')
const UsersService = require('./services/seller/UsersService')
const UsersValidator = require('./validator/seller/users')

//Shops
const shops = require('./api/api_seller/shop')
const ShopsService = require('./services/seller/ShopsService')
const ShopValidator = require('./validator/seller/shops')


// food
const foods = require('./api/api_seller/foods')
const FoodService = require('./services/seller/FoodService')
const FoodValidator = require('./validator/seller/food')

//drink
const drinks = require('./api/api_seller/drinks')
const DrinkService = require('./services/seller/DrinksService')
const DrinkValidator = require('./validator/seller/drink')

//Buyer
const authenticationsBuyer = require('./api/api_buyer/authentications')
const buyer = require('./api/api_buyer/buyer')
const BuyersService = require('./services/buyer/BuyerService')
const BuyerValidator = require('./validator/buyer')




// driver
const authenticationsDriver = require('./api/api_driver/authentications')
const driver = require('./api/api_driver/driver')
const DriverService = require('./services/driver/DriversService')
const DriversValidator = require('./validator/driver/driver')

//biodata
const biodata = require('./api/api_driver/biodata')
const BiodataService = require('./services/driver/BiodatataService')
const BiodataValidator = require('./validator/driver/biodata')


// authentications

const AuthenticationsService = require('./services/AuthenticationsService')
const TokenManager = require('./tokenize/TokenManager')
const AuthenticationsValidator = require('./validator/authentications');



const init = async () => {

    const userService = new UsersService()
    const shopService = new ShopsService()
    const foodService = new FoodService()
    const drinkService = new DrinkService()
    const buyerService = new BuyersService()
    const driverService = new DriverService()
    const biodataService = new BiodataService()
    const authenticationsService = new AuthenticationsService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            }
        }

    })

    await server.register([
        {
            plugin: Jwt
        }
    ])

    server.auth.strategy('pesan_antar_jwt', 'jwt', {
        keys: process.env.ACCESS_TOKEN_KEY,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: process.env.ACCESS_TOKEN_AGE,
        },
        validate: (artifacts) => ({
            isValid: true,
            credentials: {
                id: artifacts.decoded.payload.id,
            },
        }),
    })


    await server.register([
        {
            plugin: driver,
            options: {
                service: driverService,
                validator: DriversValidator
            }
        },
        {
            plugin: buyer,
            options: {
                service: buyerService,
                validator: BuyerValidator
            }
        },
        {
            plugin: users,
            options: {
                service: userService,
                validator: UsersValidator
            }
        },
        {
            plugin: biodata,
            options: {
                service_driver : driverService,
                service_biodata : biodataService,
                validator: BiodataValidator
            }
        },
        {
            plugin: shops,
            options: {
                service: shopService,
                validator: ShopValidator
            }
        },
        {
            plugin: foods,
            options: {
                service_shop: shopService,
                service_food: foodService,
                validator: FoodValidator
            }
        },
        {
            plugin: drinks,
            options: {
                service_shop: shopService,
                service_drink: drinkService,
                validator: DrinkValidator
            }
        },
        {
            plugin: authenticationsBuyer,
            options: {
                authenticationsService,
                buyerService,
                tokenManager: TokenManager,
                validator: AuthenticationsValidator,
            },
        },
        {
            plugin: authenticationsDriver,
            options: {
                authenticationsService,
                driverService,
                tokenManager: TokenManager,
                validator: AuthenticationsValidator,
            },
        },
        {
            plugin: authenticationsSeller,
            options: {
                authenticationsService,
                userService,
                tokenManager: TokenManager,
                validator: AuthenticationsValidator,
            },
        },

    ]);
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
}
init()