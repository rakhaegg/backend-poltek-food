const AuthenticationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'authenticationsDriver',
  version: '1.0.0',
  register: async (server, {
    authenticationsService,
    driverService,
    tokenManager,
    validator,
  }) => {
    const authenticationsHandler = new AuthenticationsHandler(
      authenticationsService,
      driverService,
      tokenManager,
      validator,
    );
    server.route(routes(authenticationsHandler));
  },
};