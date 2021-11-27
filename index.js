const http = require('http');
const notFountHandler = require('./src/handlers/notFountHandler');
const getHandler = require('./src/handlers/getHandler');
const postHandler = require('./src/handlers/postHandler');
const putHandler = require('./src/handlers/putHandler');
const deleteHandler = require('./src/handlers/deleteHandler');
const personValidator = require('./src/validators/personValidator');

const server = http.createServer();
server.listen(4444);

server.on('request', (request, response) => {
  let url = request.url.split("/");
  let page = url[1];
  let userId = url[2];

  switch (request.method) {
    case 'GET':
      switch (page) {
        case 'person':
          getHandler(response, userId);

          break;
        default:
          notFountHandler(response);
      }

      break;

    case 'POST':
      switch (page) {
        case 'person':
          postHandler(request, response);

          break;
        default:
          notFountHandler(response);
      }

      break;

    case 'PUT':
      switch (page) {
        case 'person':
          if (personValidator(userId, response)) {
            break;
          }

          putHandler(request, response, userId);

          break;
        default:
          notFountHandler(response);
      }

      break;

    case 'DELETE':
      switch (page) {
        case 'person':
          if (personValidator(userId, response)) {
            break;
          }

          deleteHandler(response, userId);

          break;
        default:
          notFountHandler(response);
      }

      break;

    default:
      response.writeHead(500);
      response.write('Wrong method.');
      response.end();
  }
});

console.log('Server running at http://127.0.0.1:4444/');
