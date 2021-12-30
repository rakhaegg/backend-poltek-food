const BuyerUserHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'buyer',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const usersHandler = new BuyerUserHandler(service, validator);
    server.route(routes(usersHandler));
  },
};