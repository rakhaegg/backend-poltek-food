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
    {
      method: 'GET',
      path: '/order/shops/{id}',
      handler: handler.getNameShopByIdForOrderHandler,
      
    },
    {
      method: 'GET',
      path: '/order/drivers',
      handler: handler.getOrderDriver,
      
    },
    {
      method: 'GET',
      path: '/order/seller/{id}',
      handler: handler.getOrderForSeller,
      
    },
    {
      method: 'PUT',
      path: '/order/drivers/{id}',
      handler: handler.putDataToOrderFromDriverHandler,
      
    },
    {
      method: 'PUT',
      path: '/order/seller/{id}',
      handler: handler.putDataToOrderFromSellerHandler,
      
    },
    {
      method: 'PUT',
      path: '/order/buyer/{id}',
      handler: handler.putDataToOrderFromBuyerHandler,
      
    },
  ];
  
  module.exports = routes;