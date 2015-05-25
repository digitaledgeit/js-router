var assert = require('assert');
var Router = require('..');

describe('Router', function() {

  describe('.route()', function() {

    it('should only call a matching handler', function(done) {
      var i=0;

      Router()
        .map('/api/cheese', function(ctx) {
          ++i;
        })
        .map('/api', function(ctx) {
          ++i;
        })
        .map('/foo', function(ctx) {
          ++i;
        })
        .route('/api', function(err) {
          assert.equal(err, null);
          assert.equal(i, 1);
          done();
        })
      ;

    });

    it('should call a sync handler', function(done) {
      var i=0;

      Router()
        .map('*', function(ctx) {
          ++i;
        })
        .route('/', function(err) {
          assert.equal(err, null);
          assert.equal(i, 1);
          done();
        })
      ;

    });

    it('should call an async handler', function(done) {
      var i=0;

      Router()
        .map('*', function(ctx, next) {
          ++i;
          next();
        })
        .route('/', function(err) {
          assert.equal(err, null);
          assert.equal(i, 1);
          done();
        })
      ;

    });

    it('should call handlers in order', function(done) {
      var i=0;

      Router()
        .map('*', function(ctx) {
          ++i;
          assert.equal(i, 1);
        })
        .map('*', function(ctx, next) {
          ++i;
          assert.equal(i, 2);
          next();
        })
        .route('/', function(err) {
          assert.equal(err, null);
          assert.equal(i, 2);
          done();
        })
      ;

    });

    it('should not call another handler after throwing an error', function(done) {
      var i=0;

      Router()
        .map('*', function(ctx) {
          ++i;
          throw new Error();
        })
        .map('*', function(ctx, next) {
          ++i;
          next();
        })
        .route('/', function(err) {
          assert(err instanceof Error);
          assert.equal(i, 1);
          done();
        })
      ;
    });

    it('should not call another handler after receiving an error', function(done) {
      var i=0;

      Router()
        .map('*', function(ctx, next) {
          ++i;
          next(new Error());
        })
        .map('*', function(ctx, next) {
          ++i;
          next();
        })
        .route('/', function(err) {
          assert(err instanceof Error);
          assert.equal(i, 1);
          done();
        })
      ;
    });

    it('should call handler with context', function(done) {
      var i=0;

      Router()
        .map('/api/cheese/:type', function(ctx) {
          assert.equal('/api/cheese/brie', ctx.url);
          assert.equal('brie', ctx.params.type);
        })
        .route('/api/cheese/brie', function(err) {
          assert.equal(err, null);
          done();
        })
      ;

    });

    it('should call handler with custom context', function(done) {
      var i=0;

      Router()
        .map('/api/cheese/:type', function(ctx) {
          assert.equal('ServiceManager', ctx.services);
        })
        .route('/api/cheese/brie', {services: 'ServiceManager'}, function(err) {
          assert.equal(err, null);
          done();
        })
      ;

    });

    it('callback should be called on next tick', function(done) {
      var i=0;

      Router()
        .route('/api', function(err) {
          assert.equal(err, null);
          assert.equal(i, 1);
          done();
        })
      ;

      ++i;

    });

    it('callback should be called with matched=true', function(done) {

      Router()
        .map('/api', function() {
        })
        .route('/api', function(err, ret) {
          assert.equal(err, null);
          assert(ret.matched);
          done();
        })
      ;

    });

    it('callback should be called with matched=false', function(done) {

      Router()
        .route('/api', function(err, ret) {
          assert.equal(err, null);
          assert(!ret.matched);
          done();
        })
      ;

    });

  });

});