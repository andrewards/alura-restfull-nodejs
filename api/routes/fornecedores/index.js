const Router = require('express').Router();
const table = require('./table');
const Fornecedor = require('./fornecedor');
const { SerializadorFornecedor, Serializador, SerializadorProduto } = require('../../Serializador');

Router.options('/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    res.status(204);
    res.end();
});

Router.post('/', async (req, res, next) => {
    
    try {

        const dadosRecebidos = req.body;
        const fornecedor = new Fornecedor(dadosRecebidos);
        await fornecedor.create();

        res.status(201);
        const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'));
        res.send(serializador.serializar(fornecedor));
    } catch(err) {
        next(err);
    }

});

Router.get('/', async (req, res) => {
    const resultados = await table.read();

    res.status(200);
    const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'));
    res.send(serializador.serializar(resultados));
});

Router.options('/:idFornecedor', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET, PATCH, DELETE');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    res.status(204);
    res.end();
});

Router.get('/:idFornecedor', async (req, res, next) => {
    
    try {
        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({ id });
        await fornecedor.searchForID();

        res.status(200);
        const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'), ['email', 'dataCriacao', 'dataAtualizacao', 'versao']);
        res.send(serializador.serializar(fornecedor));
    } catch(err) {
        next(err);
    }

});

Router.patch('/:idFornecedor', async (req, res, next) => {
    
    try {

        const id = req.params.idFornecedor;
        const dadosRecebidos = req.body;
    
        //const dados = Object.assign({}, dadosRecebidos, {id});
        const dados = {
            id,
            ...dadosRecebidos,
        }
    
        const fornecedor = new Fornecedor(dados);
        await fornecedor.update();

        res.status(204);
        res.end();
    } catch(err) {
        next(err);
    }
});

Router.patch('/:idFornecedor/calcular-reposicao-de-estoque', async (req, res, next) => {
    try {

        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({ id });
        const results = await fornecedor.calcularReposicaoDeEstoque();

        const serializador = new Serializador(res.getHeader('Content-Type'), ['qtd', 'produtosZerados'], [], 'produtosZerados');
        const serializadorProduto = new SerializadorProduto(res.getHeader('Content-Type'));

        res.send(serializador.serializar({
            qtd: results.length,
            produtosZerados: serializadorProduto.serializar(results),
        }));

    } catch(err) {
        next(err);
    }
});

Router.delete('/:idFornecedor', async (req, res, next) => {
    
    try {

        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({id});
        await fornecedor.delete();

        res.status(204);
        res.end();
    } catch(err) {
        next(err);
    }
    
});

const RouterProducts = require('./produtos');

const middlewareVerificarFornecedor = async (req, res, next) => {
    try {
        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({ id });
        await fornecedor.searchForID();
        req.fornecedor = fornecedor;
        next();
    } catch(err) {
        next(err);
    }
};
Router.use('/:idFornecedor/produtos', middlewareVerificarFornecedor, RouterProducts);

module.exports = Router;