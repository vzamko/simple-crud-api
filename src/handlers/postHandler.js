const { addPerson } = require('../database/database');
const createValidator = require('../validators/createValidator');
const jsonValidator = require('../validators/jsonValidator');

const postHandler = (request, response) => {
  let body = '';

  request.on('data', (data) => {
    body += data;

    if (body.length > 1e6) {
      request.connection.destroy();
    }
  })
  request.on('end', () => {
    if (jsonValidator(body)) {
      response.writeHead(500, {'Content-Type': 'text/html'});
      response.write(jsonValidator(body));
      response.end();

      return;
    }

    if (!body || createValidator(JSON.parse(body))) {
      response.writeHead(400, {'Content-Type': 'text/html'});
      response.write('Some of required fields do not exist or not valid.');
      response.end();

      return;
    }

    addPerson(JSON.parse(body));

    response.writeHead(201, {'Content-Type': 'text/html'});
    response.write('User ' + JSON.parse(body).name + ' has been created.');
    response.end();
  })
}

module.exports = postHandler;