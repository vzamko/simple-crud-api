const { validate } = require('uuid');

const uuidValidator = (userId, response) => {
  if (userId && !validate(userId)) {
    response.writeHead(400, {'Content-Type': 'application/json'});
    response.write(JSON.stringify({message: 'uuid is not valid.'}));
    response.end();

    return true;
  }

  return false;
}

module.exports = uuidValidator;