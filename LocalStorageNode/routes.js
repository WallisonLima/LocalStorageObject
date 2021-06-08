const express = require('express');
const routes = express.Router();
const bodyParser = require('body-parser');
const helpers = require('./helpers')
const GetProducts = require('./controllers/pedidos/GetProducts').GetProducts
const CreatOrder = require('./controllers/pedidos/CreatOrder').CreatOrder
const CreatProduct = require('./controllers/products/CreatProduct').CreatProduct

routes.use(bodyParser.urlencoded({ extended: false }))
routes.use(bodyParser.json())


routes.get('/', async(req, res)=>{
    let content = await GetProducts()
    let boddy = await helpers.GetPart(__dirname + "/public_html/views/index.html", [{search: '{{Produtos}}', replace: content}])
    res.send(boddy)
})



routes.get('/pedidos', (req, res)=>{
    res.sendFile(__dirname + "/public_html/views/pedidos.html")
})

routes.get('/carrinho', (req, res)=>{
    res.sendFile(__dirname + "/public_html/views/carrinho.html")
})

routes.get('/cadastro', (req, res)=>{
    res.sendFile(__dirname + "/public_html/views/cadastro.html")
})


routes.post('/cadastro/pedido', async (req, res)=>{
    let resp = await CreatOrder(req)
    res.sendFile(__dirname + "/public_html/views/pedidos.html")
})


routes.get("/cadastrar-produto", async (req, res)=>{
    res.sendFile(__dirname + "/public_html/views/produtos.html")
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