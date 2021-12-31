const AuthenticationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'authenticationsBuyer',
  version: '1.0.0',
  register: async (server, {
    authenticationsService,
    buyerService,
    tokenManager,
    validator,
  }) => {
    const authenticationsHandler = new AuthenticationsHandler(
      authenticationsService,
      buyerService,
      tokenManager,
      validator,
    );
    server.route(routes(authenticationsHandler));
  },
};