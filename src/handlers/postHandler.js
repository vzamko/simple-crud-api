const { getDatabase, getPersonById, addPerson, changePerson, removePerson } = require('../database/database');

const postHandler = (request, response) => {
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
}

module.exports = postHandler;