const routes = (handler) => [
    {
      method: 'POST',
      path: '/buyer/authentications',
      handler: handler.postAuthenticationHandler,
    },
    {
      method: 'PUT',
      path: '/buyer/authentications',
      handler: handler.putAuthenticationHandler,
    },
    {
      method: 'DELETE',
      path: '/buyer/authentications',
      handler: handler.deleteAuthenticationHandler,
    },
  ];
  
  module.exports = routes;