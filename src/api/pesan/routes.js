const routes = (handler) => [
    {
      method: 'POST',
      path: '/order',
      handler: handler.postOrderHanlder,
     
    },
    {
      method: 'GET',
      path: '/order/buyer/{id}',
      handler: handler.getOrderByIdHandler,
      
    },
    {
      method: 'PUT',
      path: '/order/{id}',
      handler: handler.putOrderByIdHandler,
      
    },
    

  ];
  
  module.exports = routes;