const notFountHandler = (response, url) => {
  response.writeHead(404, {'Content-Type': 'text/html'});
  response.write('Route ' + url + ' does not exist.');
  response.end();
}

module.exports = notFountHandler;