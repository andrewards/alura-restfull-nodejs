const Router = require('express').Router();
const table = require('./table');

const { SerializadorFornecedor, Serializador, SerializadorProduto } = require('../../Serializador');

Router.options('/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    res.status(204);
    res.end();
});

Router.get('/', async (req, res) => {
    const resultados = await table.read();

    res.status(200);
    const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'));
    res.send(serializador.serializar(resultados));
});

module.exports = Router;