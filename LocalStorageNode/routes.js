const express = require('express');
const routes = express.Router();
const helpers = require('./helpers')
const GetProducts = require('./controllers/pedidos/GetProducts').GetProducts
const db = require('./BD/database')
const bodyParser = require('body-parser');
const gerencianetBoleto = require('./pay/generateBoleto').gerencianetBoleto
const fs = require('fs')

routes.use(bodyParser.urlencoded({ extended: false }))
routes.use(bodyParser.json())

let urlencodedParser = bodyParser.urlencoded({ extended: false })

routes.get('/', urlencodedParser, async(req, res)=>{
    let products = await db.findDB('Products')
    let contentProduct = await GetProducts(products)
    let content = '';
    content += await helpers.GetPart(__dirname + "/public_html/views/headr.html", [{search: '{{title}}', replace: "Home"}])
    content += await helpers.GetPart(__dirname + "/public_html/views/home.html", [{search: '{{Produtos}}', replace: contentProduct}])
    res.send(content)
})

routes.get('/pedidos', urlencodedParser, async (req, res)=>{
    let orders = await db.findDB('Orders')
    let pedidos = [];
    let i = 1;
    for(let pedido of orders){
        let product = [];
        for(let produto of pedido.pedido.listProdutos){
            product.push(`<tr> 
                            <td> ${produto.produto} </td> 
                            <td> ${produto.valor} </td> 
                            <td> ${produto.qtd} </td> 
                            <td> ${(produto.qtd * produto.valor).toFixed(2)} </td> 
                          </tr>`)
        }
        pedidos.push(`<div class="dados">
                        <ul class="list-group">
                            <li class="list-group-item active">COMPRA ${i}</li>
                            <li class="list-group-item">Nome: ${pedido.pedido.dados.nome} </li> 
                            <li class="list-group-item">CPF: ${pedido.pedido.dados.cpf} </li>
                            <li class="list-group-item">Email: ${pedido.pedido.dados.email} </li> 
                            <li class="list-group-item">CEP: ${pedido.pedido.dados.cep} </li>
                            <li class="list-group-item">Rua: ${pedido.pedido.dados.rua} </li>
                            <li class="list-group-item">Bairro: ${pedido.pedido.dados.bairro} </li>
                            <li class="list-group-item">Cidade: ${pedido.pedido.dados.cidade} </li>
                            <li class="list-group-item">Estado: ${pedido.pedido.dados.uf} </li>
                        </ul>    
                      </div>
                      <div class="table"> 
                            <table class="table" border="1" >
                                        <thead>
                                            <tr>
                                                <th>Produto</th>
                                                <th>Valor unitário</th>
                                                <th>Quantidade</th>
                                                <th>Total do Item</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tabelaDinamica">
                                            <tr>${product}</tr>                                    
                                        </tbody>
                            </table>
                      </div>`)
        i++
    }
    let content = '';
    content += await helpers.GetPart(__dirname + "/public_html/views/headr.html", [{search: '{{title}}', replace: "Pedidos"}])
    content += await helpers.GetPart(__dirname + "/public_html/views/pedidos.html", [{search: '{{pedidos}}', replace: pedidos}])
    res.send(content)
})

routes.get('/carrinho', urlencodedParser, async (req, res)=>{
    let content = ''
    content += await helpers.GetPart(__dirname + "/public_html/views/headr.html", [{search: '{{title}}', replace: "Carrinho"}])
    content += await helpers.GetPart(__dirname + "/public_html/views/carrinho.html")
    res.send(content)
})

routes.get('/cadastro', urlencodedParser, async (req, res)=>{
    let content = '';
    content += await helpers.GetPart(__dirname + "/public_html/views/headr.html", [{search: '{{title}}', replace: "Cadastro"}])
    content += await helpers.GetPart(__dirname + "/public_html/views/cadastroPessoa.html")
    res.send(content)
})

routes.get("/cadastrar-produto/", urlencodedParser, async (req, res)=>{
    let content = '';
    content += await helpers.GetPart(__dirname + "/public_html/views/headr.html", [{search: '{{title}}', replace: "Cadastrar Produto"}])
    content += await helpers.GetPart(__dirname + "/public_html/views/cadastroProdutos.html")
    res.send(content)
})

routes.get("/boleto", async (req, res)=>{
    try {
        let path = './tmp/boletos/boleto.pdf'
        var data =fs.readFileSync(path);
        res.contentType("application/pdf");
        res.send(data);
    } catch (err) {
        res.status(500)
        console.log(err)
        res.send(err.message)
    }
})


routes.post("/gerar-boleto/", urlencodedParser, async (req, res)=>{
    await gerencianetBoleto(req.body)
    res.status('OK')
})

routes.post('/cadastrar-pedido/', urlencodedParser, async (req, res)=>{
    let resp = await db.insertDB('Orders', req.body);
    if(resp != undefined){
        res.status("ok")
    } 
    else{
        res.status(Error)
    }
})

routes.post("/cadastrar-produto/cadastrar", urlencodedParser, async(req, res)=>{
    let resp = await insertDB('Products', req.body)
    if(resp.result.n == 1 && resp.result.ok == 1){
        res.redirect("/cadastrar-produto")
    }
    else{
        res.send(Error)
    }
})





module.exports = routes;