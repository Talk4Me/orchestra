'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Path = require('path');

const routes = require('./routes');
const api = require('./api');

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, '../../dist')
      }
    }
  }
});
server.register(Inert, () => {});

if (process.env.NODE_ENV === 'production') {
  console.log('Production mode');
  server.connection({ port: 8080 });
  server.route(routes);
} else {
    console.log('Develop mode');
  server.connection({ port: 3000 });
}

server.route(api);

server.start((err) => {

  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
