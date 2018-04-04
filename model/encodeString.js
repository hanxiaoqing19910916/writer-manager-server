var crypto = require("crypto");

module.exports = (mingma) => {
    var md5 = crypto.createHash('md5');
    var encodeString = md5.update(mingma).digest('base64');
    return encodeString;
}
