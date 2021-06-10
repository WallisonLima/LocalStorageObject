const express = require('express');
const server = express();
const routes = require('./routes');
const port = 8080;

server.use(express.static("public_html"));
server.use(routes);
server.use('body-pareser')


server.listen(port, ()=>{
    console.log(`Servidor rodando em http://localhost:${port}`)
})