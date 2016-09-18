var express = require('express');
var app = express();
const spawn = require('child_process').spawn;
app.get('/', function(req, res) {
    res.send('Hello World!');
});
app.get('/p', function(req, res) {
    const ls = spawn('python', ['gen.py', 'req.query.name', 'req.query.dt']);
    res.send(req.query.name + "\t" + req.query.dt);
});
app.listen(8080, function() {
    console.log('Example app listening on port 8080!');
});
