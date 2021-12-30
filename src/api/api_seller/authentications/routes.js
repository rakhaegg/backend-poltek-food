const routes = (handler) => [
    {
      method: 'POST',
      path: '/seller/authentications',
      handler: handler.postAuthenticationHandler,
    },
    {
      method: 'PUT',
      path: '/seller/authentications',
      handler: handler.putAuthenticationHandler,
    },
    {
      method: 'DELETE',
      path: '/seller/authentications',
      handler: handler.deleteAuthenticationHandler,
    },
  ];
  
  module.exports = routes;