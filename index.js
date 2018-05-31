const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qazwsxedc",
    database: "gy1"
});



connection.connect((error) => {
    if(error){
        console.error('err connecting: ' + error.stack);
        return;
    }
    console.log('connected as id' + connection.threadId);
});

const createSql = `CREATE TABLE IF NOT EXISTS users(
    id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL, 
    password VARCHAR(32) NOT NULL,
    age TINYINT UNSIGNED NOT NULL DEFAULT 10,
    sex BOOLEAN);`;

connection.query(createSql,function (err,result) {
    if(err){
        console.log('[CREATE ERROR] - ',err.message);
        return;
    }
    console.log('CREATE SUCCESS:',result);
});

const insertSql = ''
connection.query(insertSql,function (err,result) {
    if(err){
        console.log('[insertSql ERROR] - ',err.message);
        return;
    }
    console.log('insertSql SUCCESS:',result);
});


connection.end();




var encodeParams = require("./model/encodeParams");


// 客户端请求接口的时候 localstorage有acclogin_token值就传，若无就传""，
var userLoginParams = {
    "acclogin_token": "xxxxx",
    "loginName": "han",
    "password": 23,
    "res_action": "login",
};

// console.log(encodeParams.encodeParams(userLoginParams));

// 登陆的时候 根据time_stamp判断请求是否过期，暂时设为20秒
// 若是客户端请求参数有acclogin_token，再用time_stamp判断客户端的acclogin_token是否过期
// 若是客户端请求参数没有acclogin_tokenn, 生成新的acclogin_token（生成规则可用loginName+时间戳再MD5）
// 生成userid（可为数据库字段的递增值）


var loginResultInfo = {
    "userid": "1",
    "userName": "han",
    "acclogin_token": "xxxxx",
    "error_num": "1",
    "error_msg": "xxxx"
}

// 通过error_num判断失败类型，若是login_token过期，就一定要清localstorage的acclogin_token为""，

