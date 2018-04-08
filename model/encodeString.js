var crypto = require("crypto");


module.exports.MD5 = (stringValue) => {
    let md5 = crypto.createHash('md5');
    return md5.update(stringValue).digest('hex');
}
