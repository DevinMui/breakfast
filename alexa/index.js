/**
 * App ID for the skill
 */
var request = require('request')
var APP_ID = "amzn1.echo-sdk-ams.app.bccbc1e0-a82b-407a-a34f-dce2f6baaebb"; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * Hello is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Hello = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Hello.prototype = Object.create(AlexaSkill.prototype);
Hello.prototype.constructor = Hello;

Hello.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("Hello onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Hello.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("Hello onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome to the Alexa Skills Kit, you can say hello";
    var repromptText = "You can say hello";
    response.ask(speechOutput, repromptText);
};

Hello.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("Hello onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Hello.prototype.intentHandlers = {
    // register custom intent handlers
    "Make": function (intent, session, response) {
        var options = {
            url: 'http://fa61082d.ngrok.io/sandwich'
        };
        request.get(options, function(err, res, body){
            if(!err)
                response.tellWithCard("Ok")
            else
                response.tellWithCard("Oh no. We could not reach the server")
        })
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the Hello skill.
    var skill = new Hello();
    skill.execute(event, context);
};