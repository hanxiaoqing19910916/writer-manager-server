var encodeString = require("./model/encodeString");
var db = require("./model/db.js");


//把用户名和密码存入数据库
db.mg_insertOne("users",{
    "loginName" : "han",
    "password" : 23
},function(err,result){
    if(err){
        // console.log();
    }

});


//
db.mg_find("users", {"password" : {$gt : 2}}, {limit: 2}, (err,result) => {
    console.log(result);
});

