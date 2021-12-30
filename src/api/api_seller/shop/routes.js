const routes = (handler) => [
  {
    method: 'POST',
    path: '/seller/shops',
    handler: handler.postShopHandler,
    options: {
      auth: 'pesan_antar_jwt',
    },
  },
  {
    method: 'GET',
    path: '/seller/shops',
    handler: handler.getShopHandler,
    options: {
      auth: 'pesan_antar_jwt',
    },
  },
  {
    method: 'GET',
    path: '/seller/shops/{id}',
    handler: handler.getShopByIdHandler,
    options: {
      auth: 'pesan_antar_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/seller/shops/{id}',
    handler: handler.putShopByIdHandler,
    options: {
      auth: 'pesan_antar_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/seller/shops/{id}',
    handler: handler.deleteShopByIdHandler,
    options: {
      auth: 'pesan_antar_jwt',
    },
  },
];

module.exports = routes;