
module.exports.GetProducts = async function GetProducts(products){
    return new Promise(async (resolve, reject)=>{
        let tr = '';
        let content = '';
        for(let product of products){
            let id = product._id;
            tr += `<tr class="trProduct">`;
            let img = `<td><img src=${product.img} height="50"></td>`;
            let produto = `<td>${product.product}</td>`;
            let desc = `<td>${product.description}</td>`;
            let val = `<td>${product.value}</td>`;
            let botao = `<td><button id=${id} type="button" class="btn btn-light" onclick=comprar(this.id)>Comprar</button></td>`                                                                                                                                                                                          
            tr += img + produto + desc + val + botao;
            tr += `</tr>`
        }
        content = tr;
        resolve(content)
    })
}