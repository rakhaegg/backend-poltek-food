const routes = (handler) => [
    {
      method: 'POST',
      path: '/buyer',
      handler: handler.postBuyerUserHandler,
    },
    {
      method: 'GET',
      path: '/buyer/{id}',
      handler: handler.getBuyerUserHandler,
    },
  ];
  
  module.exports = routes;