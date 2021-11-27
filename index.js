const http = require('http');
const { getDatabase, getPersonById, addPerson, changePerson, removePerson } = require('./src/database/database');

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
          response.writeHead(200, {"Content-Type": "application/json"});

          if (userId) {
            response.write(JSON.stringify(getPersonById(userId)));
          } else {
            response.write(JSON.stringify(getDatabase()));
          }

          response.end();
          break;
        default:
          response.write('Not fount');
          response.end();
      }

      break;

    case 'POST':
      switch (page) {
        case 'person':
          let body = '';

          request.on('data', (data) => {
            body += data;

            if (body.length > 1e6) {
              request.connection.destroy();
            }
          })
          request.on('end', () => {
            addPerson(JSON.parse(body));

            response.writeHead(201, {'Content-Type': 'text/html'});
            response.write('User ' + body.name + ' has been created.');
            response.end();
          })
          break;
        default:
          response.write('Not fount');
          response.end();
      }

      break;

    case 'PUT':
      if (!userId) {
        response.writeHead(400, {'Content-Type': 'text/html'});
        response.write('Person ID is required.');
        response.end();

        break;
      }

      if (getPersonById(userId) === 'Person does not exist.') {
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.write('User ID ' + userId + ' does not exist.');
        response.end();

        break;
      }

      let body = '';

      request.on('data', (data) => {
        body += data;

        if (body.length > 1e6) {
          request.connection.destroy();
        }
      });

      request.on('end', () => {
        changePerson(userId, JSON.parse(body));

        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('User with ID ' + userId + ' has been update.');
        response.end();
      });

      break;

    case 'DELETE':
      removePerson(userId);

      response.writeHead(204, {'Content-Type': 'text/html'});
      response.end();

      break;

    default:
      response.writeHead(500);
      response.write('Wrong method.');
      response.end();
  }
});

console.log('Server running at http://127.0.0.1:4444/');
