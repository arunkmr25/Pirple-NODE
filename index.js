var http = require('http');
var url = require('url');
var env = require('./config.js');

var server = http.createServer(function (req, res) {
  uniqueServer(req, res);
});
server.listen(env.httpPort, function () {
  console.log('listening on port no: '+ env.httpPort + ' in '+env.envName+ 'mode' );
});

var uniqueServer = function(req, res) {
  var parsedURL = url.parse(req.url, true);
  var path = parsedURL.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');
  var method = req.method.toLowerCase();
  var queryParams = parsedURL.query;
  var headers = req.headers;

  req.on('data', function (data) {
  });

  req.on('end', function () {
    var chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
    var objData = {
      'trimmedPath': trimmedPath,
      'method': method,
      'queryParams': queryParams,
      'headers': headers
    };
    chosenHandler(objData, function (statusCode, payload) {
      statusCode = typeof (statusCode) === "number" ? statusCode : 200;
      payload = typeof (payload) === "object" ? payload : {};
      responsePayload = JSON.stringify(payload);
      res.setHeader('Content-Type','aplication/json')
      res.writeHead(statusCode);
      res.end(responsePayload);
      console.log(statusCode, payload);
    });
  });
};

var handlers = {};
handlers.hello = function (data, callback) {
  callback(200,{'message': 'Hi welcome to the demo app'});
};
handlers.notFound = function (data, callback) {
  callback(404);
};
var router = {
  'hello': handlers.hello
};


