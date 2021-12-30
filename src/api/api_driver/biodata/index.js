const BiodataHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'biodata',
  version: '1.0.0',
  register: async (server, { service_driver, service_biodata  , validator }) => {
    const biodataHandler = new BiodataHandler(service_driver, service_biodata , validator) ;
    server.route(routes(biodataHandler));
  },
};