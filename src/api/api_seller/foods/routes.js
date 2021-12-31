const routes = (handler) => [
  {
    method: 'POST',
    path: '/seller/shops/food/{id}',
    handler: handler.postFoodHandler,
    options: {
      auth: 'pesan_antar_jwt',
    },
  },
  {
    method: 'GET',
    path: '/seller/shops/food/{id}',
    handler: handler.getFoodsHandler,
    options: {
      auth: 'pesan_antar_jwt',
    },
  },
  {
    method: 'GET',
    path: '/seller/shops/food/buyer/{id}',
    handler: handler.getFoodsForBuyerHandler,
    
  },
  {
    method: 'PUT',
    path: '/seller/shops/food/{id}',
    handler: handler.putShopHandler,
    options: {
      auth: 'pesan_antar_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/seller/shops/food/{id}',
    handler: handler.deleteFoodHandler,
    options: {
      auth: 'pesan_antar_jwt',
    },
  },
  
];

module.exports = routes;