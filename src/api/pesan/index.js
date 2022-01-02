const PesanHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'order',
  version: '1.0.0',
  register: async (server, { service }) => {
    const pesanHandler = new PesanHandler(service);
    server.route(routes(pesanHandler));
  },
};