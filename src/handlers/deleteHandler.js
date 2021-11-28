const { removePerson } = require("../database/database");
const serverErrorHandler = require("./serverErrorHandler");

const deleteHandler = (response, userId) => {
  try {
    removePerson(userId);
  } catch (e) {
    serverErrorHandler(response);
  }

  response.writeHead(204, { "Content-Type": "application/json" });
  response.write(
    JSON.stringify({ message: "User with ID " + userId + " has been removed." })
  );
  response.end();
};

module.exports = deleteHandler;
