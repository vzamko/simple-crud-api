const { addPerson, getPersonById } = require("../database/database");
const createValidator = require("../validators/createValidator");
const jsonValidator = require("../validators/jsonValidator");
const serverErrorHandler = require("./serverErrorHandler");

const postHandler = (request, response) => {
  let body = "";

  request.on("data", (data) => {
    body += data;

    if (body.length > 1e6) {
      request.connection.destroy();
    }
  });
  request.on("end", () => {
    if (jsonValidator(body)) {
      response.writeHead(500, { "Content-Type": "application/json" });
      response.write(JSON.stringify(jsonValidator(body)));
      response.end();

      return;
    }

    if (!body || createValidator(JSON.parse(body))) {
      response.writeHead(400, { "Content-Type": "application/json" });
      response.write(
        JSON.stringify({
          message: "Some of required fields do not exist or not valid.",
        })
      );
      response.end();

      return;
    }

    let result;

    try {
      result = addPerson(JSON.parse(body));
    } catch (e) {
      serverErrorHandler(response);
    }

    let message = { id: result.id, ...getPersonById(result.id) };

    response.writeHead(201, { "Content-Type": "application/json" });
    response.end(JSON.stringify(message));
  });
};

module.exports = postHandler;
