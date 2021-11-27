const http = require('http');
const notFountHandler = require('./src/handlers/notFountHandler');
const getHandler = require('./src/handlers/getHandler');
const postHandler = require('./src/handlers/postHandler');
const putHandler = require('./src/handlers/putHandler');
const deleteHandler = require('./src/handlers/deleteHandler');
const personValidator = require('./src/validators/personValidator');
const uuidValidator = require('./src/validators/uuidValidator');

const server = http.createServer();
server.listen(4444);

server.on('request', (request, response) => {
  let url = request.url.split("/");
  let page = url[1];
  let userId = url[2];

  if (uuidValidator(userId, response)) {
    return;
  }

  switch (request.method) {
    case 'GET':
      switch (page) {
        case 'person':
          getHandler(response, userId);

          return;
        default:
          notFountHandler(response, request.url);
      }

      return;

    case 'POST':
      switch (page) {
        case 'person':
          if (userId) {
            response.writeHead(400, {'Content-Type': 'text/html'});
            response.write('The person ID is superfluous.');
            response.end();
          }

          postHandler(request, response);

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

          putHandler(request, response, userId);

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

          deleteHandler(response, userId);

          return;
        default:
          notFountHandler(response);
      }

      return;

    default:
      response.writeHead(500);
      response.write('Wrong method.');
      response.end();

      return;
  }
});

console.log('Server running at http://127.0.0.1:4444/');
