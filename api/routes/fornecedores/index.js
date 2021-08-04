const Router = require('express').Router();
const table = require('./table');
const Fornecedor = require('./fornecedor');

Router.post('/', async (req, res) => {
    
    try {

        const dadosRecebidos = req.body;
        const fornecedor = new Fornecedor(dadosRecebidos);
        await fornecedor.create();

        res.status(201);
        res.send(JSON.stringify(fornecedor));
    } catch(err) {

        res.send(JSON.stringify({
            erros: JSON.parse(err.message),
        }));
    }

});

Router.get('/', async (req, res) => {
    const resultados = await table.read();

    res.status(200);
    res.send(JSON.stringify(resultados));
});

Router.get('/:idFornecedor', async (req, res) => {
    
    try {
        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({ id });
        await fornecedor.searchForID();

        res.status(200);
        res.send(JSON.stringify(fornecedor));
    } catch(err) {

        res.send(JSON.stringify({
            mensagem: err.message
        }));
    }

});

Router.patch('/:idFornecedor', async (req, res) => {
    
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

        res.send(JSON.stringify({
            mensagem: err.message,
        }));
    }
});

Router.delete('/:idFornecedor', async (req, res) => {
    
    try {

        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({id});
        await fornecedor.delete();

        res.status(204);
        res.end();
    } catch(err) {

        res.send(JSON.stringify({
            mensagem: err.message,
        }));
    }
    
});

module.exports = Router;