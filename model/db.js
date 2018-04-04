var MongoClient = require('mongodb').MongoClient;
var settings = require("../settings.js");



function _connectDB(callback) {
    let url = settings.mongodburl;
    let db_name = settings.databaseName;
    console.log(`connecting to url: ${url}`);
    MongoClient.connect(url, (err, client) => {
        if (err) {
            console.log(`connect error: ${err}`);
            return;
        }
        console.log(`connect url: ${url} success`);
        let db = client.db(db_name);
        callback(err, client, db);
    });
}

exports.mg_insertOne = (collectionName, doc, insertOneOpCallback) => {
    _connectDB((err, client, db) => {
        db.collection(collectionName).insertOne(doc, (err, result) => {
            insertOneOpCallback(err,result);
            client.close();
       })
    });
}



exports.mg_find = (collectionName, query, options, findCallBack) => {
    let result = [];
    _connectDB((err, client, db) => {
       let cursor = db.collection(collectionName).find(query, options);
       cursor.toArray((error, docs) => {
            findCallBack(error, docs)
        });
    });
}



exports.mg_deleteMany = (collectionName, filter, deleteWriteOpCallback) => {
    _connectDB((err, client, db) => {
        //删除
        db.collection(collectionName).deleteMany(filter,(error, result) => {
            deleteWriteOpCallback(error, result);
            client.close();
        });
    });
}





exports.updateMany = (collectionName, json1, json2, callback) => {
    _connectDB((err, client, db) => {
        db.collection(collectionName).updateMany(
            json1,
            json2,
            (err, results) => {
                callback(err, results);
                client.close();
            });
    })
}


exports.getAllCount = (collectionName,callback) => {
    _connectDB((err, db) => {
        db.collection(collectionName).count({}).then((count) => {
            callback(count);
            db.close();
        });
    })
}

