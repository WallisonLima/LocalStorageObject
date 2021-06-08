const express = require('express');
const routes = express.Router();
const helpers = require('./helpers')
const GetProducts = require('./controllers/pedidos/GetProducts').GetProducts
const db = require('./BD/database')


routes.get('/', async(req, res)=>{
    let products = await db.findDB('Products')
    let contentProduct = await GetProducts(products)
    let headr = await helpers.GetPart(__dirname + "/public_html/views/headr.html")
    let body = await helpers.GetPart(__dirname + "/public_html/views/index.html", [{search: '{{Produtos}}', replace: contentProduct}])
    let content = headr + body
    res.send(content)
})

routes.get('/pedidos', async (req, res)=>{
    let headr = await helpers.GetPart(__dirname + "/public_html/views/headr.html")
    let body = await helpers.GetPart(__dirname + "/public_html/views/pedidos.html")
    let content = headr + body
    res.send(content)
})

routes.get('/carrinho', async (req, res)=>{
    let headr = await helpers.GetPart(__dirname + "/public_html/views/headr.html")
    let body = await helpers.GetPart(__dirname + "/public_html/views/carrinho.html")
    let content = headr + body
    res.send(content)
})

routes.get('/cadastro', async (req, res)=>{
    let headr = await helpers.GetPart(__dirname + "/public_html/views/headr.html")
    let body = await helpers.GetPart(__dirname + "/public_html/views/cadastro.html")
    let content = headr + body
    res.send(content)
})

routes.get("/cadastrar-produto", async (req, res)=>{
    let headr = await helpers.GetPart(__dirname + "/public_html/views/headr.html")
    let body = await helpers.GetPart(__dirname + "/public_html/views/produtos.html")
    let content = headr + body
    res.send(content)
})


routes.post('/cadastro/pedido', async (req, res)=>{
    let resp = await insertDB('Orders', body);
    let headr = await helpers.GetPart(__dirname + "/public_html/views/headr.html")
    let body = await helpers.GetPart(__dirname + "/public_html/views/pedidos.html")
    let content = headr + body
    res.send(content)
})

routes.post("/cadastrar-produto/cadastrar", async(req, res)=>{
    let resp = await insertDB('Products', req.body)
    if(resp.result.n == 1 && resp.result.ok == 1){
        res.redirect("/cadastrar-produto")
    }
    else{
        res.send(Error)
    }
})



module.exports = routes;