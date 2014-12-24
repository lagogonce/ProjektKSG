/**
 * Created by Tailor888 on 2014-12-16.
 */

//todo to dziala ladnie i pieknie na localhoscie, heroku ma problemy z portami, zostawiam zakomentowane, trzeba to ogarnac
//todo zmienna port

  /*
var http = require('http');
var io = require('socket.io');
var _ = require('underscore')._;

var port = process.env.PORT || 5000;

var server = http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
});

server.listen(port);

var socket = io.listen(server);

var clients = {};
var clientsData = {};

var distanceInKm = 2.0;

console.log('server starting, listening on port: ' + port);

socket.on('connection', function(client) {

  console.log('server connected');

  client.on('message', function(data) {
    console.log('message received');

    if (clientsData[client.id] && clients[client.id]) {
      var userList = filterUsers(clientsData[client.id].lat, clientsData[client.id].lon);

      Object.keys(userList).forEach(function (key) {
        var list = getUsernames(userList);
        clients[key].emit('message', clientsData[client.id].username + ": " + data);
      });
    }
  });

  client.on('connect', function(data) {

    var cl = JSON.parse(data);

    console.log('client connected, username: ' + cl.username);
    clients[client.id] = client;
    clientsData[client.id] = cl;

    var userList = filterUsers(cl.lat, cl.lon);

    client.emit('message', 'Hello ' + cl.username);
    Object.keys(userList).forEach(function(key) {
      var list = getUsernames(userList);
      clients[key].emit('users', JSON.stringify(list));
    });
  });

  function getUsernames(userList) {
    var list = [];
    Object.keys(userList).forEach(function(key) {
      list.push(clientsData[key].username);
    });
    return list;
  }

  client.on('disconnect', function() {
    console.log('client disconnected');
    if(clients[client.id] && clientsData[client.id]) {
      var lat = clientsData[client.id].lat;
      var lon = clientsData[client.id].lon;

      delete clients[client.id];
      delete clientsData[client.id];

      var userList = filterUsers(lat, lon);
      Object.keys(userList).forEach(function(key) {
        var list = getUsernames(userList);
        clients[key].emit('users', JSON.stringify(list));
      });
    }
  });

  function filterUsers(lat, lon) {
    var filteredClients = {};
    Object.keys(clients).forEach(function(key) {
      if(getDistanceFromLatLonInKm(lat, lon, clientsData[key].lat, clientsData[key].lon) <= distanceInKm) {
        filteredClients[key] = clients[key];
      }
    });
    return filteredClients;
  }

  function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

});
*/
