const FoodsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'foods',
  version: '1.0.0',
  register: async (server, { service_shop, service_food  , validator }) => {
    const foodHandler = new FoodsHandler(service_shop, service_food , validator) ;
    server.route(routes(foodHandler));
  },
};