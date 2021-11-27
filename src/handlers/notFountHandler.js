const notFountHandler = (response) => {
  response.writeHead(404, {'Content-Type': 'text/html'});
  response.write('Route does not exist.');
  response.end();
}

module.exports = notFountHandler;