const publicMongo = 'mongodb://127.0.0.1:27017'
const mongoClient = require('mongodb').MongoClient
const connect = mongoClient.connect(publicMongo, {useNewUrlParser: true,  useUnifiedTopology: true});


module.exports.findDB = async function findDB(dbName, query={}, options={}){
    return new Promise(async (resolve, reject)=>{
        connect.then(function(db) {
            let dbo = db.db("LocalStorageObject");
            dbo.collection(dbName).find().toArray(function(err, res) {
                if (err){
                   throw err
                };
                resolve(res);
            });
        });
    });
};


module.exports.insertDB = async function insertDB(dbName, myobj){
    console.log(myobj)
    return new Promise(async (resolve, reject)=>{
        connect.then(function(db) {
            let dbo = db.db("LocalStorageObject");
            dbo.collection(dbName).insertOne(myobj, function(err, res) {
                if (err) {
                    throw err;
                }
                resolve(res);
            });
        });
    })
}