const express = require('express');
const routes = express.Router();
const bodyParser = require('body-parser');
const helpers = require('./helpers')
const GetProducts = require('./controllers/pedidos/GetProducts').GetProducts
const CreatOrder = require('./controllers/pedidos/CreatOrder').CreatOrder

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




module.exports = routes;