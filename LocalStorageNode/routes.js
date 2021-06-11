const express = require('express');
const routes = express.Router();
const helpers = require('./helpers')
const GetProducts = require('./controllers/pedidos/GetProducts').GetProducts
const db = require('./BD/database')
const bodyParser = require('body-parser');
const gerencianetBoleto = require('./pay/generateBoleto').gerencianetBoleto

routes.use(bodyParser.urlencoded({ extended: false }))
routes.use(bodyParser.json())

let urlencodedParser = bodyParser.urlencoded({ extended: false })

routes.get('/', async(req, res)=>{
    let products = await db.findDB('Products')
    let contentProduct = await GetProducts(products)
    let content = '';
    content += await helpers.GetPart(__dirname + "/public_html/views/headr.html", [{search: '{{title}}', replace: "Home"}])
    content += await helpers.GetPart(__dirname + "/public_html/views/index.html", [{search: '{{Produtos}}', replace: contentProduct}])
    res.send(content)
})

routes.get('/pedidos', async (req, res)=>{
    let content = '';
    content += await helpers.GetPart(__dirname + "/public_html/views/headr.html", [{search: '{{title}}', replace: "Pedidos"}])
    content += await helpers.GetPart(__dirname + "/public_html/views/pedidos.html")
    res.send(content)
})

routes.get('/carrinho', async (req, res)=>{
    let content = ''
    content += await helpers.GetPart(__dirname + "/public_html/views/headr.html", [{search: '{{title}}', replace: "Carrinho"}])
    content += await helpers.GetPart(__dirname + "/public_html/views/carrinho.html")
    res.send(content)
})

routes.get('/cadastro', async (req, res)=>{
    let content = '';
    content += await helpers.GetPart(__dirname + "/public_html/views/headr.html", [{search: '{{title}}', replace: "Cadastro"}])
    content += await helpers.GetPart(__dirname + "/public_html/views/cadastroPessoa.html")
    res.send(content)
})

routes.get("/cadastrar-produto/", async (req, res)=>{
    let content = '';
    content += await helpers.GetPart(__dirname + "/public_html/views/headr.html", [{search: '{{title}}', replace: "Cadastrar Produto"}])
    content += await helpers.GetPart(__dirname + "/public_html/views/cadastroProdutos.html")
    res.send(content)
})

routes.post("/gerar-boleto", async (req, res)=>{
    let resp = await gerencianetBoleto(req.body)
    console.log(resp)
})


routes.post('/cadastrar-pedido/', urlencodedParser, async (req, res)=>{
    let resp = await db.insertDB('Orders', req.body);
    let content = '';
    content += await helpers.GetPart(__dirname + "/public_html/views/headr.html", [{search: '{{title}}', replace: "Cadastrar Pedido"}])
    content += await helpers.GetPart(__dirname + "/public_html/views/pedidos.html")
    res.send(content)
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