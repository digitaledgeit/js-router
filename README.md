# router

A simple router for client *and* server side apps. 

Dispatches a URL to the first handler with a matching pattern.

## Installation

    npm install --save digitaledgeit-router

## Usage

    var router = require('digitaledgeit-router');
    
    router()
      .map('/', function() {
        console.log('index');
      })
      .map('/user/:username', function(params) {
        console.log('user profile', params);
      })
      .map('*', function() {
        console.log('not found');
      })
      .route('/')
      .route('/user/jameslnewell')
      .route('/blah')
    ;
   
## Examples

### Simple

    $ node example/simple.js

### Client

    $ browserify example/client.js > example/client.build.js
    $ open example/client.html
    
### Server

    $ node example/server.js
    $ open http://localhost:3001/
    $ open http://localhost:3001/user/jameslnewell
    $ open http://localhost:3001/blah
     
## API

### new Router()

Create a new router.

### .map(pattern : string|RegExp, handler : function)

Map a URL pattern to a handler.

### .route(url : string)

Route a URL to the first matching handler.

### .on(event : string, handler : function)

Register an event handler.

### .off(event : string, handler : function)

Un-register an event handler.

## To Do

- splats http://backbonetutorials.com/what-is-a-router/
- named routes for URL generation
- prefixes/router chains
- return the fn and match info from .route() and extract calling of the handler fn into a dispatch method to allow the user to call the handler as they wish e.g. pass in the req, res and next???? but code needs to be consistent on client and server anyway

## License

The MIT License (MIT)

Copyright (c) 2015 James Newell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.