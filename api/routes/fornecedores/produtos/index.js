const Router = require('express').Router({ mergeParams: true });
const table = require('./table');

const Produto = require('./produto');

Router.get('/', async (req, res) => {
    const fornecedor = req.fornecedor.id;
    const produtos = await table.read(fornecedor);
    res.send(JSON.stringify(produtos));
});

Router.post('/', async (req, res, next) => {
    try {
        const fornecedor = req.fornecedor.id;
        const body = req.body;
    
        // const data = Object.assign({}, body, { fornecedor });
        const data = {
            fornecedor,
            ...body,
        };

        const produto = new Produto(data);
        await produto.create();

        res.status(201);
        res.send(produto);
    } catch(err) {
        next(err);
    }
});

Router.delete('/:idProduto', async (req, res) => {
    const data = {
        id: req.params.idProduto,
        fornecedor: req.fornecedor.id,
    };

    const produto = new Produto(data);
    await produto.delete();

    res.status(204);
    res.end();
});

Router.get('/:idProduto', async (req, res, next) => {
    
    try {

        const data = {
            id: req.params.idProduto,
            fornecedor: req.fornecedor.id,
        };
    
        const produto = new Produto(data);
        await produto.searchForID();
    
        res.send(JSON.stringify(produto));
    } catch(err) {
        next(err);
    }
});

module.exports = Router;