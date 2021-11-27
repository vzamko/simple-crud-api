const { validate } = require('uuid');

const uuidValidator = (userId, response) => {
  if (userId && !validate(userId)) {
    response.writeHead(400);
    response.write('uuid is not valid.');
    response.end();

    return true;
  }

  return false;
}

module.exports = uuidValidator;