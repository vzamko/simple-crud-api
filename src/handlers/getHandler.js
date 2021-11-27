const { getDatabase, getPersonById } = require('../database/database');
const personValidator = require('../validators/personValidator');

const getHandler = (response, userId) => {
  response.writeHead(200, {"Content-Type": "application/json"});

  if (userId) {
    if (personValidator(userId, response)) {
      return;
    }

    response.write(JSON.stringify(getPersonById(userId)));
  } else {
    response.write(JSON.stringify(getDatabase()));
  }

  response.end();
}

module.exports = getHandler;