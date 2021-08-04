const Router = require('express').Router();
const table = require('./table');
const Fornecedor = require('./fornecedor');

Router.get('/', async (req, res) => {
    const resultados = await table.read();
    res.send(JSON.stringify(resultados));
});

Router.post('/', async (req, res) => {
    const dadosRecebidos = req.body;
    const fornecedor = new Fornecedor(dadosRecebidos);
    await fornecedor.create();
    res.send(JSON.stringify(fornecedor));
});

module.exports = Router;