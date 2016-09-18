/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

var https = require('https');
var http = require('http');
/**
 * Variable defining the length of the delimiter between events
 */
var delimiterSize = 2;
/*
 * All of the good good stuff
 */
var NAME_TO_FILE = {
        "hackmty": "hackmty",
        "bigredhacks": "bigredhacks",
        "hackthenorth": "hackthenorth",
        "hackisu": "hackisu",
        "lumohacks": "lumohacks",
        "ramhacks": "ramhacks",
        "hackgt": "hackgt",
        "medhacks": "medhacks",
        "hackcooper": "hackcooper",
        "hackdartmouththree": ,
        "hackdartmouth3": ,
        "hackdartmouththethird": ,
        "hackdartmouthiii": ,
        "sdhacks": "sdhacks",
        "volhacks": "volhacks",
        "hackumbc": "hackumbc",
        "healthhacks": "healthhacks",
        "tamuhack": "tamuhack",
        "whack": "whack",
        "hackumassiv": "hackumassiv",
        "hackumassthefourth": "hackumassiv",
        "hackumassfour": "hackumassiv",
        "hackumass4": "hackumassiv",
        "hackustate": "hackustate",
        "kenthackenough": "kenthackenough",
        "mhacks8": "mhacks8",
        "hackny": "hackny",
        "revolutionuc": "revolutionuc",
        "hackrice": "hackrice",
        "hackwesternthree": "hackwestern3",
        "hackwestern3": "hackwestern3",
        "quackcon": "quackcon",
        "dubhacks": "dubhacks",
        "hackriddle": "hackriddle",
        "citrushack": "citrushack",
        "fishhacks": "fishhacks",
        "hackgsu": "hackgsu",
        "hackharvard": "hackharvard",
        "ycphacks": "ycphacks",
        "hackru": "hackru",
        "hacktx": "hacktx",
        "miagamejam": "miagamejam",
        "miamigamejam": "miagamejam",
        "hacknc": "hacknc",
        "coderedcuriosity": "coderedcuriosity",
        "archhacks": "archhacks",
        "electriccityhacks": "electriccityhacks",
        "hackholyoke": "hackholyoke",
        "hoyahacks": "hoyahacks",
        "hackae": "hackae",
        "hacknjit": "hacknjit",
        "hackthehill": "hackthehill",
        "huskiehack2016": "huskiehack2016",
        "technica": "technica",
        "hacktheu": "hacktheu",
        "hackpsu": "hackpsu",
        "hackrpi": "hackrpi",
        "mlhprimesouthwest": "mlhprimesouthwest",
        "mlhprime": "mlhprime",
        "mxhacksiv": "mxhacksiv",
        "mxhacksfour": "mxhacksiv",
        "mxhacksthefourth": "mxhacksiv",
        "mxhacks4": "mxhacks4",
        "tecmihacks": "tecmihacks",
        "wildhacks": "wildhacks",
        "localhackday": "localhackday",
        "minnehack": "minnehack",
        "hackatown": "hackatown",
        "hackupc": "hackupc",
        "hacksheffield": "hacksheffield",
        "jacobshack": "jacobshack",
        "brumhack": "brumhack",
        "astonhack": "astonhack",
        "lauzhack": "lauzhack",
        "junction": "junction",
        "hackkings": "hackkings",
        "hacknotts": "hacknotts",
    }

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function() {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function(sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function(launchRequest, session, response) {
    console.log("HelloWorld onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Which mlh hackathon would you like to hear about?";
    response.ask(speechOutput, speechOutput);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function(sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function(intent, session, response) {
        handleNewFactRequest(response);
    },

    "HackathonName": function(intent, session, response) {
        var lookupCategory = (intent.slots.Category).toLowerCase().replace(/\s/g, '');;
        var stringResult;
        var url = "http://127.0.0.1:8090/" + lookupCategory + ".txt";
        http.get(url, function(res) {
            var body = '';

            res.on('data', function(chunk) {
                body += chunk;
            });

            res.on('end', function() {
                stringResult = parseJson(body);
                response.ask(body + ". Would you like to look up another hackathon?", "Would you like to look up another hackathon?");
            });
        }).on('error', function(e) {
            console.log("Got error: ", e);
            response.ask("could not find a hackathon named " + (intent.slots.Category) + ". Would you like to look up another hackathon?", "Would you like to look up another hackathon?");
        });
    },
    "GetNextEventIntent": function(intent, session, response) {
        response.ask("What schedule would you like to look up?", "What schedule would you like?");
    },
    "AMAZON.HelpIntent": function(intent, session, response) {
        response.ask("Name the hackathon you wish to hear the schedule for", "What schedule would you like?");
    },

    "AMAZON.StopIntent": function(intent, session, response) {
        var speechOutput = "Happy hacking";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function(intent, session, response) {
        var speechOutput = "Happy hacking";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fact: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

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
// Create the handler that responds to the Alexa Request.
exports.handler = function(event, context) {
    // Create an instance of the SpaceGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};
