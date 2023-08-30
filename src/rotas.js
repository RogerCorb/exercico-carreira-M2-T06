const express = require(`express`);
const { listaItem, adicionaItem, atualizaItem, excluiItem, encontraUmItem } = require("./controlador/controller");
const rotas = express(); 

// Rota GET para obter todos os itens
rotas.get('/items', listaItem);

// Rota GET busca 01 item
rotas.get('/items/:id',encontraUmItem);

// Rota POST para adicionar um novo item
rotas.post('/items', adicionaItem);

// Rota PUT para atualizar um item existente
rotas.put('/items/:id',atualizaItem)

// Rota DELETE para remover um item
rotas.delete('/items/:id', excluiItem); 

module.exports = rotas; 

