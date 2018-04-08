
var db = require("./model/db.js");
var encodeParams = require("./model/encodeParams");


// 客户端请求接口的时候 localstorage有acclogin_token值就传，若无就传""，

var userLoginParams = {
    "acclogin_token" : "xxxxx",
    "loginName" : "han",
    "password" : 23,
    "res_action": "login",
};

console.log(encodeParams.encodeParams(userLoginParams));
// 登陆的时候 根据time_stamp判断请求是否过期，暂时设为20秒
// 若是客户端请求参数有acclogin_token，再用time_stamp判断客户端的acclogin_token是否过期
// 若是客户端请求参数没有acclogin_tokenn, 生成新的acclogin_token（生成规则可用loginName+时间戳再MD5）
// 生成userid（可为数据库字段的递增值）


var loginResultInfo = {
    "userid" : "1",
    "userName" : "han",
    "acclogin_token" : "xxxxx",
    "error_num" : "1",
    "error_msg" : "xxxx"
}

// 通过error_num判断失败类型，若是login_token过期，就一定要清localstorage的acclogin_token为""，








//把用户名和密码存入数据库
// db.mg_insertOne("users",{
//     "loginName" : "han",
//     "password" : 23
// },function(err,result){
//     if(err){
//         // console.log();
//     }
//
// });
//
//
// db.mg_find("users", {"password" : {$gt : 2}}, {limit: 2}, (err,result) => {
//     console.log(result);
// });


