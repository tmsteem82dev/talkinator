const builder = require("botbuilder");

const lib = new builder.Library("misc.greetings");

lib.dialog("/greeting", [function (session, args, next) {

    let msgs = ["Good day", "Hello", "Hi"]

    if (session.userData.name) {
        for (let i = 0; i < msgs.length; i++) {
            msgs[i] = `${msgs[i]}, ${session.userData.name}!`;
        }
    }
    session.send(msgs);
    next();
}, function (session, result, next) {
    if (session.userData.name) {
        session.endConversation();
    } else {
        builder.Prompts.text(session, "My name is Tobor, what is your name?");
    }

}, function (session, result, next) {
    session.userData.name = result.response;
    session.endConversation("Nice to meet you.")
}]);

module.exports.createLibrary = function () {
    return lib.clone();
};