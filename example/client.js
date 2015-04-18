var router = require('./routes');

function route() {
  var url = document.location.pathname;
  console.log('Routing URL:', url);
  router.route(url);
}

window.addEventListener('popstate', route);
route();
