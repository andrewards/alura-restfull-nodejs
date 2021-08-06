const Router = require('express').Router({ mergeParams: true });
const table = require('./table');
const { SerializadorProduto } = require('../../../Serializador');

const Produto = require('./produto');

Router.options('/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    res.status(204);
    res.end();
});

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

        res.set('ETag', produto.versao);
        const updateTime = (new Date(produto.dataAtualizacao)).getTime();
        res.set('Last-Modified', updateTime);
        res.set('Location', `/api/fornecedores/${produto.fornecedor}/produtos/${produto.id}`);

        res.status(201);
        res.send(serializador.serializar(produto));
    } catch(err) {
        next(err);
    }
});

Router.options('/:idProduto', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET, HEAD, PATCH, DELETE');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    res.status(204);
    res.end();
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

        res.set('ETag', produto.versao);
        const updateTime = (new Date(produto.dataAtualizacao)).getTime();
        res.set('Last-Modified', updateTime);

        res.send(serializador.serializar(produto));
    } catch(err) {
        next(err);
    }
});

Router.head('/:idProduto', async (req, res, next) => {
    try {

        const data = {
            id: req.params.idProduto,
            fornecedor: req.fornecedor.id,
        };
    
        const produto = new Produto(data);
        await produto.searchForID();

        res.set('ETag', produto.versao);
        const updateTime = (new Date(produto.dataAtualizacao)).getTime();
        res.set('Last-Modified', updateTime);

        res.status(200);
        res.end();
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

        await produto.searchForID();
        res.set('ETag', produto.versao);
        const updateTime = (new Date(produto.dataAtualizacao)).getTime();
        res.set('Last-Modified', updateTime);

        res.status(204);
        res.end();
    } catch(err) {
        next(err);
    }
});

Router.options('/:idProduto/diminuir-estoque', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'PATCH');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    res.status(204);
    res.end();
});

Router.patch('/:idProduto/diminuir-estoque', async (req, res, next) => {
    
    try {
        
        const produto = new Produto({
            id: req.params.idProduto,
            fornecedor: req.fornecedor.id,
        });
    
        await produto.searchForID();
        produto.sell(req.body.quantidade);

        await produto.searchForID();
        res.set('ETag', produto.versao);
        const updateTime = (new Date(produto.dataAtualizacao)).getTime();
        res.set('Last-Modified', updateTime);

        res.status(204);
        res.end();
    } catch(err) {
        next(err);
    }

});

module.exports = Router;