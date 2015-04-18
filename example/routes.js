var Router = require('..');

var router = Router()
  .add('/', function(params) {
    console.log('index', params);
  })
  .add('/user/:username', function(params) {
    console.log('user profile', params);
  })
  .add('*', function(params) {
    console.log('not found', params);
  })
;

module.exports = router;