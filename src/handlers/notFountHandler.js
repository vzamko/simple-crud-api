const notFountHandler = (response, url) => {
  response.writeHead(404, { "Content-Type": "application/json" });
  response.write(
    JSON.stringify({ message: "Route " + url + " does not exist." })
  );
  response.end();
};

module.exports = notFountHandler;
