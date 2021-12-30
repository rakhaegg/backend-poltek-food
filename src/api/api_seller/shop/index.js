const ShopHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'shops',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const shopHandler = new ShopHandler(service, validator);
    server.route(routes(shopHandler));
  },
};