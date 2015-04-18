var Http = require('http');
var router = require('./routes');

var server = Http.createServer(function(req, res) {
  var url = req.url;
  console.log('Routing URL:', url);
  router.route(url);
  res.end();
});

server.listen(3001, function() {
  console.log('server started');
});
