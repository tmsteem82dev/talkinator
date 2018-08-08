const luis_com = require('./utils/luis_com')
const processLuisResult = function (session, rawLuisData) {

    let luisData = JSON.parse(rawLuisData);
    let topScoringIntent = luisData.topScoringIntent;

    console.log("Top scoring intent: " + JSON.stringify(topScoringIntent));
    if (topScoringIntent.score < 0.8) {
        // TODO these should be replaced with intents in LUIS or not used anymore at all 
        // TODO depending on the purpose for the bot
        switch (session.message.text.toLocaleLowerCase()) {
            case "how are you?":
                session.replaceDialog("/how_are_you");
                break;
            case "what is github?":
                session.replaceDialog("/what_is_github");
                break;
            default:
                session.send("I don't understand: " + session.message.text);
                break;
        }
        return;
    }

    switch (topScoringIntent.intent) {
        case "misc.greeting":
            session.replaceDialog("misc.greetings:/greeting");
            break;
        default:
            session.endConversation("I can't help you with that.");
            break;
    }
};

exports.processMessageWithLuis = function (session, message) {
    luis_com.getLuisIntentPromise(message).then(function (response) {
        processLuisResult(session, response);
    });
}