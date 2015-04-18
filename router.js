var pathToRegExp = require('path-to-regexp');

/**
 * A router
 * @constructor
 */
function Router() {

  if (!(this instanceof Router)) {
    return new Router();
  }

  /** @private */
  this.routes = [];

}

/**
 * Add a handler for a URL
 * @param   {string|RegExp}       pattern
 * @param   {function(Object)}    handler
 * @returns {Router}
 */
Router.prototype.add = function(pattern, handler) {
  var keys    = [];
  var regexp  = pattern;

  //convert the pattern to a RegExp
  if (!(pattern instanceof RegExp)) {
    if (pattern === '*') {
      regexp = new RegExp('.*');
    } else {
      regexp = pathToRegExp(pattern, keys);
    }
  }

  //add the route
  this.routes.push({
    regexp:   regexp,
    keys:     keys,
    handler:  handler
  });

  return this;
};

/**
 * Route a URL to the first matching handler
 * @param   {string}    url       The URL path
 * @returns {Router}
 */
Router.prototype.route = function(url) {
  var matched = false;

  for (var i=0; i<this.routes.length; ++i) {

    //get the route
    var route = this.routes[i];

    //evaluate the route
    var matches = url.match(route.regexp);
    if (matches) {

      //extract parameters
      var params = {};
      for (var j=1; j<matches.length; ++j) {
        var key = route.keys[j-1];
        if (!key) continue;
        params[key.name] = matches[j]
      }

      //call the handler
      route.handler.call(this, params);

      //stop matching
      matched = true;
      break;

    }

  }

  //handle 404
  if (!matched) {
    throw new Error('Route not found.')
  }

  return this;
};

module.exports = Router;