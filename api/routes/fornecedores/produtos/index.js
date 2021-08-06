const Router = require('express').Router({ mergeParams: true });
const table = require('./table');
const { SerializadorProduto } = require('../../../Serializador');

const Produto = require('./produto');

Router.get('/', async (req, res) => {
    const fornecedor = req.fornecedor.id;
    const produtos = await table.read(fornecedor);

    const serializador = new SerializadorProduto(res.getHeader('Content-Type'));
    res.send(serializador.serializar(produtos));
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

        const serializador = new SerializadorProduto(res.getHeader('Content-Type'));

        res.status(201);
        res.send(serializador.serializar(produto));
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
    produto.delete();

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
    
        const serializador = new SerializadorProduto(res.getHeader('Content-Type'), [
            'preco',
            'estoque',
            'fornecedor',
            'dataCriacao',
            'dataAtualizacao',
            'versao',
        ]);
        res.send(serializador.serializar(produto));
    } catch(err) {
        next(err);
    }
});

Router.patch('/:idProduto', async (req, res, next) => {
    
    try {
        
        // const data = Object.assign(
        //     {},
        //     req.body,
        //     {
        //         id: req.params.idProduto,
        //         fornecedor: req.fornecedor.id,    
        //     }
        // );
        const data = {
            id: req.params.idProduto,
            fornecedor: req.fornecedor.id,
            ...req.body,
        };

        const produto = new Produto(data);
        produto.update();

        res.status(204);
        res.end();
    } catch(err) {
        next(err);
    }
});

Router.patch('/:idProduto/diminuir-estoque', async (req, res, next) => {
    
    try {
        
        const produto = new Produto({
            id: req.params.idProduto,
            fornecedor: req.fornecedor.id,
        });
    
        await produto.searchForID();
        produto.sell(req.body.quantidade);

        res.status(204);
        res.end();
    } catch(err) {
        next(err);
    }

});

module.exports = Router;