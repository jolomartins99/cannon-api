var server = require('server').hapi;
var handlers = require('./handlers');

server.route({
  method: 'POST',
  path: '/surveys/{redeemCode}',
  config: handlers.submit
});