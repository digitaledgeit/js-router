var Router = require('..');

var router = Router()
  .map('/', function() {
    console.log('index');
  })
  .map('/user/:username', function(ctx) {
    console.log('user profile', ctx.params.username);
  })
  .on('enter', function(ctx) {
    console.log('Entering route ', ctx.url);
  })
  .on('exit', function(ctx) {
    console.log('Exiting route ', ctx.url);
  })
;

module.exports = router;