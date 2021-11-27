const { changePerson } = require('../database/database');
const jsonValidator = require('../validators/jsonValidator');

const putHandler = (request, response, userId) => {
  let body = '';

  request.on('data', (data) => {
    body += data;

    if (body.length > 1e6) {
      request.connection.destroy();
    }
  });

  request.on('end', () => {
    if (jsonValidator(body)) {
      response.writeHead(500, {'Content-Type': 'text/html'});
      response.write(jsonValidator(body));
      response.end();

      return;
    }

    changePerson(userId, JSON.parse(body));

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('User with ID ' + userId + ' has been updated.');
    response.end();
  });
}

module.exports = putHandler;