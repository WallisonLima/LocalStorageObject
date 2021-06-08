
const insertDB = require('../BD/database').insertDB

module.exports.CreatProduct = async function CreatProduct({body}){
    return new Promise(async (resolve, reject)=>{
        let resp = await insertDB('Products', body)
        resolve(resp)
    })
}