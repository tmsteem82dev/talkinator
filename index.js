const builder = require('botbuilder');
const restify = require('restify');

const server = restify.createServer();
server.listen(process.env.PORT || 3978, function () {
    console.log("%s listening to %s", server.name, server.url);
});

var connector = new builder.ChatConnector();
server.post("/api/messages", connector.listen());

const inMemoryStorage = new builder.MemoryBotStorage();

const bot = require("./bot/bot")(connector);
bot.set("storage", inMemoryStorage);