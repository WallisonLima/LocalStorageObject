const { MongoClient } = require('mongodb')
const url = 'mongodb://127.0.0.1:27017'

module.exports.findDB = async function findDB(dbName, query={}, options={}){
    return new Promise(async (resolve, reject)=>{
        let a = { ...query, phone: '123'} 
        MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
            if (err){
                throw err
            };
            let dbo = db.db("LocalStorageObject");
            dbo.collection(dbName).find().toArray(function(err, res) {
                if (err){
                   throw err
                };
                resolve(res);
                db.close();
            });
        });
    });
};


module.exports.insertDB = async function insertDB(dbName, myobj){
    return new Promise(async (resolve, reject)=>{
        MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            let dbo = db.db("LocalStorageObject");
            dbo.collection(dbName).insertOne(myobj, function(err, res) {
                if (err) {
                    throw err;
                }
                //console.log(res.insertedId)
                resolve(res);
                db.close();
            });
        });
    })
}