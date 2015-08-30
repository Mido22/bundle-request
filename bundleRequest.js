var http = require('http');
require('es6-promise').polyfill();

function middleware(req, res, next){
  var resObj = {}, 
      server = (req.app && req.app.server) ? req.app.server : req.socket.server,
      host = server.address().address,
      port = server.address().port;

  function response(){
    res.status(200).send(resObj);
  }
  Promise.all(Object.keys(req.query).map(function(key){
    return getResult(host, port, req.query[key]).then(function(result){
      resObj[key] = result;
    });
  })).then(response).catch(response);
}

function getResult(host, port, uri){

  if(uri[0]!=='/')  uri='/'+uri;
  return new Promise(function(res, rej){
    http.get({
        hostname: host,
        port: port,
        path: uri,
        agent: false  // create a new agent just for this one request
      }, function(response){
        var body='';
        response.on('data', function(chunk){
          body+=chunk;
        }).on('end', function(){
          if(response.headers['content-type'].indexOf('json')> -1) body = JSON.parse(body);
          res(body);
        });
    }).on('error', function(e){
      rej({error: 'error while request ' + e.message });  
    });
  });
}

module.exports = middleware;