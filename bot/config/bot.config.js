const _ = require("underscore");

if (process.env.ENV === "PROD") {

} else {
    module.exports = _.extend(require(__dirname + '/../config/environments/test.json') || {});
}