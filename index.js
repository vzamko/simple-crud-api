require('dotenv').config();
const http = require('http');
const notFountHandler = require('./src/handlers/notFountHandler');
const getHandler = require('./src/handlers/getHandler');
const postHandler = require('./src/handlers/postHandler');
const putHandler = require('./src/handlers/putHandler');
const deleteHandler = require('./src/handlers/deleteHandler');
const personValidator = require('./src/validators/personValidator');
const uuidValidator = require('./src/validators/uuidValidator');
const serverErrorHandler = require('./src/handlers/serverErrorHandler');

const server = http.createServer();
server.listen(process.env.PORT);

server.on('request', (request, response) => {
  let url = request.url.split("/");
  let page = url[1];
  let userId = url[2];

  if (page !== 'person') {
    notFountHandler(response, page);

    return;
  }

  if (uuidValidator(userId, response)) {
    return;
  }

  switch (request.method) {
    case 'GET':
      switch (page) {
        case 'person':
          try {
            getHandler(response, userId);
          } catch (e) {
            serverErrorHandler(response);
          }


          return;
        default:
          notFountHandler(response, request.url);
      }

      return;

    case 'POST':
      switch (page) {
        case 'person':
          if (userId) {
            response.writeHead(400, {'Content-Type': 'application/json'});
            response.write('The person ID is superfluous.');
            response.end();

            return;
          }

          try {
            postHandler(request, response);
          } catch (e) {
            serverErrorHandler(response);
          }

          return;
        default:
          notFountHandler(response, request.url);
      }

      return;

    case 'PUT':
      switch (page) {
        case 'person':
          if (personValidator(userId, response)) {
            return;
          }

          try {
            putHandler(request, response, userId);
          } catch (e) {
            serverErrorHandler(response);
          }

          return;
        default:
          notFountHandler(response);
      }

      return;

    case 'DELETE':
      switch (page) {
        case 'person':
          if (personValidator(userId, response)) {
            return;
          }

          try {
            deleteHandler(response, userId);
          } catch (e) {
            serverErrorHandler(response);
          }

          return;
        default:
          notFountHandler(response);
      }

      return;

    default:
      response.writeHead(405);
      response.write('Method ' + request.method + ' is not support.');
      response.end();

      return;
  }
});

console.log('Server running at http://127.0.0.1:' + process.env.PORT + '/');

module.exports = server;
