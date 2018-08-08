const builder = require("botbuilder");
const luis_processor = require("./luisProcessor");
const cardGenerator = require("./utils/cardGenerator");

module.exports = function (connector) {
    let bot = new builder.UniversalBot(connector)

    bot.on("conversationUpdate", function (message) {
        if (message.membersAdded[0].id === message.address.bot.id) {
            console.log("new user joined");
            var reply = null;

            //bot.loadSession(message.address, function(error, session))
            reply = new builder.Message()
                .address(message.address)
                .text("Welcome.");

            bot.send(reply);
        }
    });

    bot.dialog("/", function (session) {

        luis_processor.processMessageWithLuis(session, session.message.text);

    });

    bot.dialog("/what_is_github", [function (session, args, next) {
        session.send("For information on GitHub look at the card below:");
        next();
    }, function (session, result, next) {
        let cardMSg = cardGenerator.getGitHubCardMessage();
        session.send(cardMSg);
        session.endConversation();
    }]);

    bot.dialog("/how_are_you", [
        function (session, args, next) {
            session.send("I am good.");
            next();
        },
        function (session, result, next) {
            builder.Prompts.text(session, "How about you?");
        },
        function (session, result, next) {
            if (result.response === "I am fine.") {
                session.endConversation("That is good to hear.");
            } else {
                session.endConversation("I am sorry to hear that.");
            }
        }
    ]);

    bot.library(require("./dialogs/misc/misc.greetings").createLibrary());

    return bot;
}