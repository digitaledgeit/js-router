var extend = require('extend');
var emitter = require('component-emitter');
var pathToRegExp = require('path-to-regexp');

/**
 * A router
 * @constructor
 */
function Router() {

  if (!(this instanceof Router)) {
    return new Router();
  }

  /**
   * The available routes
   * @private
   * @type {Array.<Object>}
   */
  this.routes = [];

}
emitter(Router.prototype);

/**
 * Map a URL pattern to a handler
 * @param   {string|RegExp}       pattern
 * @param   {function(Object)}    handler
 * @returns {Router}
 */
Router.prototype.map = function(pattern, handler) {
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
 * @param   {string}                      url       The URL path
 * @param   {Object}                      context   The default context
 * @param   {function(Error, Object}}     callback  The callback
 * @returns {Router}
 */
Router.prototype.route = function(url, context, callback) {
  var self=this, i = 0, matched = false;

  if (arguments.length === 2 && typeof(context) === 'function') {
    callback  = context;
    context   = {};
  }

  function next(err) {

    if (err) {
      if (callback) callback(err, {
        matched: matched
      });
      return;
    }

    if (i>=self.routes.length) {
      if (callback) callback(null, {
        matched: matched
      });
      return;
    }

    //get the route
    var route = self.routes[i++];

    //evaluate the route
    var matches = url.match(route.regexp);
    if (matches) {
      matched = true;

      //extract parameters
      var params = {};
      for (var j = 1; j < matches.length; ++j) {
        var key = route.keys[j - 1];
        if (!key) continue;
        params[key.name] = matches[j]
      }

      //call the handler
      var
        fn  = route.handler,
        ctx = extend(true, {}, context, {
          url:    url,
          params: params
        })
      ;

      if (fn.length === 2) {

        //call asynchronously
        fn.call(this, ctx, next);

      } else {

        //call synchronously
        try {
          fn.call(this, ctx);
          next(null);
        } catch(err) {
          next(err);
        }

      }

    } else {
      next(null);
    }

  }

  setTimeout(next, 0);

  return this;
};

module.exports = Router;