const serverErrorHandler = (response) => {
  response.writeHead(500, { "Content-Type": "application/json" });
  response.write(JSON.stringify({ message: "Server error." }));
  response.end();
};

module.exports = serverErrorHandler;
