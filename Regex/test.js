var https = require('https');
var stringResult;
var url = "https://ramhacks.vcu.edu/";
https.get(url, function(res) {
    var body = '';

    res.on('data', function(chunk) {
        body += chunk;
    });

    res.on('end', function() {
        stringResult = parseJson(body);
        //eventCallback(stringResult);
    });
    console.log(stringResult);
}).on('error', function(e) {
    console.log("Got error: ", e);
});
