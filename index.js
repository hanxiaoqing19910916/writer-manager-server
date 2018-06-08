const mysql = require("mysql");
const signString = require("./model/encodeParams");
var MD5 = require("./model/encodeString").MD5;


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'qazwsxedc',
    database: 'gy1'
});


var express = require('express');
var app = express();
app.listen(4000);


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 全局拦截配置CROS
app.all('*',function(req,res,next){
	res.header('Access-Control-Allow-origin','*')
	res.header('Access-Control-Allow-Headers','accept, origin, X-Requested-With, content-type, token, userId')
	res.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS')
	res.header('Content-Type','application/json;charset=utf-8')
	res.header('Access-Control-Allow-Credentials','true')
	next()
})

var router = express.Router();
router.post('/login', function(req, res){
    // 对比请求时间
    const reqtime = req.body.time_stamp;
    if (new Date().getTime() - reqtime >= 20 * 1000) {
        res.status(408).send({code:1000,data:[],msg:'out of time'});
        return;
    }
    console.log(req.body);

    // 校验请求串 later
    // const sign = signString(req.body,'tfdajfsdad');
    

    // 数据库查找用户是否存在
    const lookupUser = `SELECT username,password FROM users WHERE username='${req.body.username}'`;
    db.query(lookupUser,function (err,result) {
        if(err){
            console.log('ERROR- ',err.message,err.errno);
            if (err.errno === 1054) {
                res.status(200).send({code:1001,msg:'用户名不存在'});
            } else {
                res.status(200).send({code:1003,msg:'数据库异常'});
            }
            return;
        }
        console.log('CREATE SUCCESS:',result);

        // 密码校验
        const resPassword = MD5(req.body.password);

        
        console.log(result[0].password);
        if (resPassword != result[0].password) {
            res.status(200).send({code:1002,msg:'密码错误'});
            return;
        } 

        res.status(200).send({code:0,msg:'登陆成功'});
    });
  
});
  

router.post('/register', function(req, res){
  console.log(req.query);
  res.status(200).send({code:200,data:[],msg:'success'});
});

app.use(router);



/** 
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
*/