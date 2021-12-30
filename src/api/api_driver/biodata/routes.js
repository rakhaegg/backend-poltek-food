const routes = (handler) => [
    {
      method: 'POST',
      path: '/drivers/biodata/{username}',
      handler: handler.postBiodataHandler,
      options: {
        auth: 'pesan_antar_jwt',
      },
    },
    {
        method: 'GET',
        path: '/drivers/biodata/{username}',
        handler: handler.getBiodataByIdHandler,
        options: {
          auth: 'pesan_antar_jwt',
        },
      },
    {
      method: 'PUT',
      path: '/drivers/biodata/{username}',
      handler: handler.putBiodataHandler,
      options: {
        auth: 'pesan_antar_jwt',
      },
    },
    
  ];
  
  module.exports = routes;