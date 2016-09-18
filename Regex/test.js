/**
 * Variable defining the length of the delimiter between events
 */
var delimiterSize = 2;
var https = require('https');
var http = require('http');
//var stringResult = "before";
//var body = "";
var url = "https://www.bigredhacks.com/";

var stringResult;
//var url = "http://127.0.0.1:8090/";
https.get(url, function(res) {
    var body = '';

    res.on('data', function(chunk) {
        body += chunk;
    });

    res.on('end', function() {
        stringResult = parseJson(body);
        console.log(body);
    });
}).on('error', function(e) {
    console.log("Got error: ", e);
});

function parseJson(inputText) {
    // sizeOf (/nEvents/n) is 10
    var text = inputText.substring(inputText.indexOf("\\nEvents\\n") + 10, inputText.indexOf("\\n\\n\\nBirths")),
        retArr = [],
        retString = "",
        endIndex,
        startIndex = 0;

    if (text.length == 0) {
        return retArr;
    }

    while (true) {
        endIndex = text.indexOf("\\n", startIndex + delimiterSize);
        var eventText = (endIndex == -1 ? text.substring(startIndex) : text.substring(startIndex, endIndex));
        // replace dashes returned in text from Wikipedia's API
        eventText = eventText.replace(/\\u2013\s*/g, '');
        // add comma after year so Alexa pauses before continuing with the sentence
        eventText = eventText.replace(/(^\d+)/, '$1,');
        eventText = 'In ' + eventText;
        startIndex = endIndex + delimiterSize;
        retArr.push(eventText);
        if (endIndex == -1) {
            break;
        }
    }
    if (retString != "") {
        retArr.push(retString);
    }
    retArr.reverse();
    return retArr;
}

// Create the handler that responds to the Alexa Request.
exports.handler = function(event, context) {
    // Create an instance of the HistoryBuff Skill.
    var skill = new HistoryBuffSkill();
    skill.execute(event, context);
};
