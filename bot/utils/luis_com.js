const querystring = require("querystring");
const request_promise = require("request-promise");
const bot_config = require("../config/bot.config");

const luis_endPoint = bot_config.luisConfig.endPoint;
const luis_AppId = bot_config.luisConfig.luisAppId;
const luis_subscriptionKey = bot_config.luisConfig.subscriptionKey;

function createLuisRequest(utternace) {

    let queryParams = {
        "subscription-key": luis_subscriptionKey,
        timezoneOffset: "0",
        verbose: true,
        q: utternace
    };

    var luisRequest =
        luis_endPoint + luis_AppId + "?" + querystring.stringify(queryParams);

    return luisRequest;
}

exports.getLuisIntentPromise = function (utternace) {
    var luisRequest = createLuisRequest(utternace);

    return request_promise(luisRequest);
};