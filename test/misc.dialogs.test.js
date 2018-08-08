const {
    BotTester,
    TestConnector
} = require("bot-tester");
const {
    expect
} = require("chai");
const cardGenerator = require("../bot/utils/cardGenerator");

const connector = new TestConnector();

describe("Talkinator using misc dialogs ", () => {
    let bot;
    beforeEach(() => {
        bot = require("../bot/bot")(connector);
    });

    for (let i = 0; i < 5; i++) {
        it("can reply hello and set name in userData", function () {

            return new BotTester(bot)
                .checkSession((session => {
                    expect(session.userData).not.to.be.null;
                    expect(session.userData.name).to.be.undefined;
                }))
                .sendMessageToBot("Hiya", ["Good day", "Hello", "Hi"], "My name is Tobor, what is your name?")
                .sendMessageToBot("Tim", "Nice to meet you.")
                .checkSession((session) => {
                    expect(session.userData).not.to.be.null;
                    expect(session.userData.name).to.be.equal('Tim');
                })
                .sendMessageToBot("Hiya", /[a-zA-Z].*tim/i)
                .runTest();

        });
    }

    let messages = ["Who are you?", "How are you doing?"]
    for (let i = 0; i < messages.length; i++) {

        it("will reply with I do not understand", function () {
            let msg = messages[i];
            return new BotTester(bot).sendMessageToBot(msg, "I don't understand: " + msg)
                .runTest();
        });
    }

    it("can handle positive how are you?", () => {
        return new BotTester(bot)
            .sendMessageToBot("How are you?", "I am good.", "How about you?")
            .sendMessageToBot("I am fine.", "That is good to hear.")
            .runTest();
    });

    it("can handle negative how are you?", () => {
        return new BotTester(bot)
            .sendMessageToBot("How are you?", "I am good.", "How about you?")
            .sendMessageToBot("Not good.", "I am sorry to hear that.")
            .runTest();
    });

    it("can show an adaptive card", () => {
        return new BotTester(bot)
            .sendMessageToBot("What is github?", "For information on GitHub look at the card below:", cardGenerator.getGitHubCardMessage)
            .runTest();
    });

});