
module.exports.GetProducts = async function GetProducts(products){
    return new Promise(async (resolve, reject)=>{
        let produtos = '';
        for(let product of products){
           produtos += `        <div class="card" style="max-width: 18rem; margin-left: 20px; margin-top: 20px;">
                                    <img class="card-img-top" src="${product.img}" alt="Card image cap" style="height: 300px;width: 200px;">
                                    <div class="card-body">
                                        <h5 class="card-title">${product.product}</h5>
                                        <p class="card-text">${product.description}</p>
                                        <a href="#" class="btn btn-primary">Comprar</a>
                                    </div>
                                </div>
                           `
                           
        }
        resolve(produtos)
    })
}