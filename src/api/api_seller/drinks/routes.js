const routes = (handler) => [
  {
    method: 'POST',
    path: '/seller/shops/drink/{id}',
    handler: handler.postDrinkHandler,
    options: {
      auth: 'pesan_antar_jwt',
    },
  },
  {
    method: 'GET',
    path: '/seller/shops/drink/{id}',
    handler: handler.getDrinkHandler,
    options: {
      auth: 'pesan_antar_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/seller/shops/drink/{id}',
    handler: handler.putDrinkHandler,
    options: {
      auth: 'pesan_antar_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/seller/shops/drink/{id}',
    handler: handler.deleteDrinksHandler,
    options: {
      auth: 'pesan_antar_jwt',
    },
  },
  {
    method: 'GET',
    path: '/seller/shops/drink/buyer/{id}',
    handler: handler.getDrinkForBuyerHandler,
    
  },
];

module.exports = routes;