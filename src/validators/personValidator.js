const { getPersonById } = require('../database/database');

const personValidator = (userId, response) => {
  if (!userId) {
    response.writeHead(400, {'Content-Type': 'application/json'});
    response.write(JSON.stringify({message: 'Person ID is required.'}));
    response.end();

    return true;
  }

  if (getPersonById(userId) === 'Person does not exist.') {
    response.writeHead(404, {'Content-Type': 'application/json'});
    response.write(JSON.stringify({message: 'User ID ' + userId + ' does not exist.'}));
    response.end();

    return true;

  }

  return false;
}

module.exports = personValidator;