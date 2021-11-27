const { removePerson } = require('../database/database');

const deleteHandler = (response, userId) => {
  removePerson(userId);

  response.writeHead(204, {'Content-Type': 'text/html'});
  response.end();
}

module.exports = deleteHandler;