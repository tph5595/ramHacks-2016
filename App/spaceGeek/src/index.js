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
    "hackdartmouththree": "hackdartmouthiii",
    "hackdartmouth3": "hackdartmouthiii",
    "hackdartmouththethird": "hackdartmouthiii",
    "hackdartmouthiii": "hackdartmouthiii",
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
    "hacknotts": "hacknotts"
};

var months = {
    "january": "01",
    "february": "02",
    "march": "03",
    "april": "04",
    "may": "05",
    "june": "06",
    "july": "07",
    "august": "08",
    "september": "09",
    "october": "10",
    "november": "11",
    "december": "12"
};
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
    console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
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
    console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function(intent, session, response) {
        handleNewFactRequest(response);
    },

    "HackathonName": function(intent, session, response) {
        var lookupCategory = (intent.slots.hackName.value).toLowerCase();
        lookupCategory = lookupCategory.replace(/\s/g, '');
        var stringResult;
        var url = "http://45.55.81.231:8080/" + lookupCategory.toString() + ".txt";
        //  response.tell("working");
        http.get(url, function(res) {
            //response.tell("fuck off");
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
            response.ask("could not find a hackathon named " + (url) + ". Would you like to look up another hackathon?", "Would you like to look up another hackathon?");
        });
    },
    "GetNextEventIntent": function(intent, session, response) {
        response.ask("What schedule would you like to look up?", "What schedule would you like?");
    },
    "AMAZON.HelpIntent": function(intent, session, response) {
        response.ask("Name the hackathon you wish to hear the schedule for", "What schedule would you like?");
    },
    "DontHearNoMore": function(intent, session, response) {
        var speechOutput = "Happy hacking";
        response.tell(speechOutput);
    },
    "AMAZON.StopIntent": function(intent, session, response) {
        var speechOutput = "Happy hacking";
        response.tell(speechOutput);
    },
    "fucker": function(intent, session, response) {
        response.ask("Fuck you too! What schedule would you like to look up?", "What schedule would you like?");
    },
    "hackisu": function(intent, session, response) {
        response.ask("at hack i s u there are 3 alienware, 1 alienware x 51 desktop, 3 amazon echo, 2 amazon fire phone, 7 arduinos, 5 base sheilds, 1 dell x p s 13, 228 grove kits components, 14 intel edisons, 6 leap motions, 1 muse headband, 1 nest thermostat kit, 6 oculas rift c v 1, 7 pebble, 1 pebble round, 6 pebble time, 4 samsung vr, 6 spark core", "What else would you like?");
    },
    "ramhacks": function(intent, session, response) {
        response.ask("at ram hacks there are 2 alienware laptops, 2 amazon fire phones, 9 arduino kits, 8 base shields, 1 dell monitor, 2 dell xps 13, 90 grove kit components, 15 intel edisons, 3 leap motions, 1 oculas rift c v 1, 8 pebbles, 1 pebble round, 8 pebble time, 2 samsung gear v r, and 5 spark core", "What else would you like?");
    },
    "lumohacks": function(intent, session, response) {
        response.ask("at lumo hacks there are 4 amazon echo, 1 amazon fire phone, 7 arduino, 6 base shields, 1 dell 19 inch monitor 1 dell inspiron gaming laptop, 1 dell monitor, 1 dell x p s 13 ubuntu, 2 dell x p s 13 windows, 94 grove kit components, 15 intel edisons, 5 leap motion, 1 nest thermostat kit, 3 oculas rift c v 1, 5 pebble, 1 pebble round, 5 pebble time, 4 samsung gear v r, 6 spark core", "What else would you like?");
    },
    "bigredhacks": function(intent, session, response) {
        response.ask("3 alienware, 7 amazon echo, 2 amazon fire phone, 10 arduino, 7 base sheild, 1 dell inspiron gaming laptop, 3 dell monitor, 1 dell x p s 13 ubuntu, 2 dell x p s 13 windows, 92 grove kit components, 13 intel edisons, 6 leap motion, 1 nest thermostat kit with built in wifi, 6 oculas rift c v 1, 7 pebble, 1 pebble round, 6 pebble time, 4 samsung gear v r, 6 spark core, 12 surface pro 4", "What else would you like?");
    },
    "hackthenorth": function(intent, session, response) {
        response.ask("2 adafruit 16 x 2 lcd plus keypad kit rpi, 1 amazon echo, 2 amazon fire phone, 6 arduino, 9 arduino leonardo, 6 base shields, 52 components, 1 dell inspiron gaming laptop, 1 dell tablet, 1 dell x p s 13 windows, 5 digital potentiometer 10k, 4 dodocase google cardboard, 1 fingerprint sensor, 1 fitbit charge hr, 3 flexiforce pressure sensor 25 pounds, 2 flexiforce pressure sensor 25 pounds i inch area, 3 force sensitive resitors half an inch, force sensitive resitor small, 3 force sensitive resitor spuare, 3 humidity and tempature sensor, 17 intel edisons, 1 myo alpha developer kit, 1 myo armband, 1 nest camera, 1 oculas rift c v 1, 1 parrot a r drone 2 point 0, 1 particle photon internet button, 6 pebble, 1 pebble round, and much much more", "What else would you like?");
    },
    "AMAZON.CancelIntent": function(intent, session, response) {
        var speechOutput = "Happy hacking";
        response.tell(speechOutput);
    },
    "GetCalendarIntent": function(intent, session, response) {
        var lookupCategory = (intent.slots.hackName.value).toLowerCase();
        lookupCategory = lookupCategory.replace(/\s/g, '');
        var stringResult;
        response.ask(lookupCategory + " was added to your calendar. Have fun hacking", "What else woudl you like?");
        var url = "http://45.55.81.231:8080/" + lookupCategory.toString() + ".txt";
        //  response.tell("working");
        http.get(url, function(res) {
            //response.tell("fuck off");
            var body = '';

            res.on('data', function(chunk) {
                body += chunk;
            });

            res.on('end', function() {
                stringResult = parseJson(body);
                response.ask(lookupCategory + " was added to your calendar. Would you like to look up another hackathon?", "Would you like to look up another hackathon?");
            });
        }).on('error', function(e) {
            console.log("Got error: ", e);
            response.ask("unable to add the " + lookupCategory + " hackathon to your calendar", "Would you like to look up another hackathon?");
        });
        //TODO need to parse more here
        url = "http://45.55.81.231:80/p?name=" + lookupCategory.toString() + "&dt=20160918T101557";
        http.get(url, function(res) {
            response.tell("fuck off");
            var body = '';

            res.on('data', function(chunk) {
                body += chunk;
            });

            res.on('end', function() {
                stringResult = parseJson(body);
                response.ask(lookupCategory + " was added to your calendar. Would you like to look up another hackathon?", "Would you like to look up another hackathon?");
            });
        }).on('error', function(e) {
            console.log("Got error: ", e);
            response.ask("unable to add the " + lookupCategory + " hackathon to your calendar", "Would you like to look up another hackathon?");
        });
    },
    "sendCalendarIntent": function(intent, session, response) {
        var speechOutput = "Your new calendar data is synced with your phone";
        response.tell(speechOutput);
    }
};


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

/*// Create the handler that responds to the Alexa Request.
exports.handler = function(event, context) {
    // Create an instance of the HistoryBuff Skill.
    var skill = new HistoryBuffSkill();
    skill.execute(event, context);
};*/
// Create the handler that responds to the Alexa Request.
exports.handler = function(event, context) {
    // Create an instance of the SpaceGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};
