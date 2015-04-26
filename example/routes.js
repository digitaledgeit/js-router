var Router = require('..');

var router = Router()
  .map('/', function(params) {
    console.log('index', params);
  })
  .map('/user/:username', function(params) {
    console.log('user profile', params);
  })
  .map('*', function(params) {
    console.log('not found', params);
  })
  .on('enter', function(ctx) {
    console.log('Entering route ', ctx.url);
  })
;

module.exports = router;