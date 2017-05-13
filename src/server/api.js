'use strict';

module.exports = [
  {
    method: 'GET',
    path: '/api/hello',
    handler: function (request, reply) {
      const response = 'hello world';
      reply(response);
    }
  }
];
