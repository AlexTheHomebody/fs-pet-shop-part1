'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');




var http = require('http');
var port = process.env.PORT || 6666;

var server = http.createServer(function(req, res) {
    console.log('before splitting: ', req.url)
    var url = req.url.split('/');
    var index = url[2];
    console.log('after splitting:', url)

  if (req.method === 'GET' && req.url === '/pets') {
    console.log('hey we made it here');
    fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
        if (err){
            console.error(err.stack)
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            return res.end('Internal Server Error');
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(petsJSON);
    });
  }else if (req.method === 'GET' && req.url === `/pets/${index}`) {
        fs.readFile(petsPath, 'utf8', function(err, json) {
          if (err) {
            console.error(err.stack);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            return res.end('Internal Server Error');
          }
    
          var pets = (JSON.parse(json));
          var petsJSON = JSON.stringify(pets[index]);
    
          res.setHeader('Content-Type', 'application/json');
          res.end(petsJSON);
        });
      }

    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not found');
  }
});

server.listen(port, function() {
  console.log('Listening on port', port);
});


