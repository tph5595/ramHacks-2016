var express = require('express');
var app = express();
var fs = require('fs');
app.get('/', function(req, res) {
    res.send('Hello World!');
});
app.get('/p', function(req, res) {
    fs.writeFile("data", (req.query.name + "\t" + req.query.dt), function(err) {});
    res.send(req.query.name + "\t" + req.query.dt);
});
app.listen(8081, function() {
    console.log('Example app listening on port 8081!');
});
