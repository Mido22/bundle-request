# bundle-request


A middleware module for Express. with the help of this library one can bundle up all the GET requests to single one pointing towards the module. This way, the extra overhead due to making multiple individual requests is reduced. 

### Usage

One can assign the module to handle any uri of his choice by:

    var server = require('http').createServer(require('express')()),
        myMiddleware = require('bundle-request');

    server.use('/api/resources', myMiddleware);

