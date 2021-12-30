const routes = (handler) => [
  {
    method: 'POST',
    path: '/seller',
    handler: handler.postUserHandler,
  },
  {
    method: 'GET',
    path: '/seller/{id}',
    handler: handler.getUserByIdHandler,
  },
];

module.exports = routes;