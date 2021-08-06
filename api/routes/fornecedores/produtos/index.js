const Router = require('express').Router({ mergeParams: true });
const table = require('./table');

Router.get('/', async (req, res) => {
    const fornecedor = req.params.idFornecedor;
    const produtos = await table.read(fornecedor);
    res.send(JSON.stringify(produtos));
});

module.exports = Router;