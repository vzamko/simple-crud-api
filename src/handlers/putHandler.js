const { changePerson } = require('../database/database');

const putHandler = (request, response, userId) => {
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
}

module.exports = putHandler;