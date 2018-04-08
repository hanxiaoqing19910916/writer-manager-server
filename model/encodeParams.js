
var MD5 = require("./encodeString").MD5;

function signString(parms, appkey) {
    //console.log(typeof(parms));
    if (typeof(parms) != "object") {
        return null;
    }
    var paramsKeys = Object.keys(parms);
    if (paramsKeys.length == 0) {
        return null;
    }
    var connectParamString = '';
    paramsKeys.sort().forEach((k) => {
        connectParamString += k + parms[k].toString();
    });
    var signString = appkey + connectParamString + appkey;
    return MD5(signString);
};

function encodeParams(parms) {
    var sign_str = signString(parms, "tfdajfsdad");
    parms["time_stamp"] = new Date().getTime();
    parms["sign_str"] = sign_str;
    return parms;
}



exports.encodeParams = encodeParams;
exports.signString = signString;