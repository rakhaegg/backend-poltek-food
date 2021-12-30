const routes = (handler) => [
    {
      method: 'POST',
      path: '/driver/authentications',
      handler: handler.postAuthenticationHandler,
    },
    {
      method: 'PUT',
      path: '/driver/authentications',
      handler: handler.putAuthenticationHandler,
    },
    {
      method: 'DELETE',
      path: '/driver/authentications',
      handler: handler.deleteAuthenticationHandler,
    },
  ];
  
  module.exports = routes;