const express = require('express');
const routes = express.Router();
const bodyParser = require('body-parser');
const helpers = require('./helpers')
const GetProducts = require('./controllers/pedidos/GetProducts').GetProducts
const CreatOrder = require('./controllers/pedidos/CreatOrder').CreatOrder
const CreatProduct = require('./controllers/products/CreatProduct').CreatProduct


routes.get('/', async(req, res)=>{
    let content = await GetProducts()
    let boddy = await helpers.GetPart(__dirname + "/public_html/views/index.html", [{search: '{{Produtos}}', replace: content}])
    res.send(boddy)
})


routes.get('/pedidos', async (req, res)=>{
    let body = await helpers.GetPart(__dirname + "/public_html/views/pedidos.html")
    res.send(body)
})

routes.get('/carrinho', async (req, res)=>{
    let body = await helpers.GetPart(__dirname + "/public_html/views/carrinho.html")
    res.send(body)
})

routes.get('/cadastro', async (req, res)=>{
    let body = await helpers.GetPart(__dirname + "/public_html/views/cadastro.html")
    res.send(body)
})

routes.get("/cadastrar-produto", async (req, res)=>{
    let body = await helpers.GetPart(__dirname + "/public_html/views/produtos.html")
    res.send(body)
})

routes.post('/cadastro/pedido', async (req, res)=>{
    let resp = await CreatOrder(req)
    let body = await helpers.GetPart(__dirname + "/public_html/views/pedidos.html")
    res.send(body)
})


routes.post("/cadastrar-produto/cadastrar", async(req, res)=>{
    let resp = await CreatProduct(req)
    if(resp.result.n == 1 && resp.result.ok == 1){
        res.redirect("/cadastrar-produto")
    }
    else{
        res.send(Error)
    }
})



module.exports = routes;