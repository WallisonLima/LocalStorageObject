const insertDB = require('../BD/database').insertDB

module.exports.CreatOrder = async function CreatOrder({body}){
    return new Promise(async (resolve, reject)=>{
        let resp = await insertDB('Orders', body);
        resolve(resp)
    })
}