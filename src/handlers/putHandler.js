const { changePerson, getPersonById } = require('../database/database');
const jsonValidator = require('../validators/jsonValidator');
const serverErrorHandler = require('./serverErrorHandler');

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
      response.writeHead(500, {'Content-Type': 'application/json'});
      response.write(JSON.stringify(jsonValidator(body)));
      response.end();

      return;
    }

    try {
      changePerson(userId, JSON.parse(body));
    } catch (e) {
      serverErrorHandler(response);
    }

    let message = {id: userId, ...getPersonById(userId)};

    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(JSON.stringify(message));
    response.end();
  });
}

module.exports = putHandler;