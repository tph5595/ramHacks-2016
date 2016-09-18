var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('Hello World!');
});
app.get('/p', function(req, res) {
    res.send(req.query.name + "\t" + req.query.date + "\t" + req.query.time + "\t" + req.query.even);
});
app.listen(8080, function() {
    console.log('Example app listening on port 8080!');
});
