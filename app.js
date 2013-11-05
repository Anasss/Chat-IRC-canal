var express = require('express');
var http = require('http');
var path = require('path');
var sio = require('socket.io');


var app = express();

app.set('port', process.env.PORT || 8080);
app.set('views',__dirname+'/views');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname ,'public')));
 

var server = http.createServer(app);
var io = sio.listen(server);


io.sockets.on('connection', function (socket, nomClient) {
    
    socket.on('nouveau_client', function(nomClient) {
       
        socket.set('nomClient', nomClient);
        socket.broadcast.emit('nouveau_client', nomClient);
    });


    
    socket.on('message', function (message) {
        socket.get('nomClient', function (error, nomClient) {
            
            socket.broadcast.emit('message', {nomClient: nomClient, message: message});
        });
    }); 
});

server.listen(8080);
