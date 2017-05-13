'use strict';

module.exports = [
  {
    method: 'GET',
    path: '/assets/{filename}',
    handler: {
      file: function (request) {
        return request.params.filename;
      }
    }
  },
  {
    method: 'GET',
    path: '/{path*}',
    handler: function (request, reply) {
      reply.file('index.html');
    }
  }
];