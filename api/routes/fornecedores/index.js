const Router = require('express').Router();
const table = require('./table');
const Fornecedor = require('./fornecedor');

Router.post('/', async (req, res) => {
    const dadosRecebidos = req.body;
    const fornecedor = new Fornecedor(dadosRecebidos);
    await fornecedor.create();
    res.send(JSON.stringify(fornecedor));
});

Router.get('/', async (req, res) => {
    const resultados = await table.read();
    res.send(JSON.stringify(resultados));
});

Router.get('/:idFornecedor', async (req, res) => {
    
    try {
        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({ id });
        await fornecedor.searchForID();
        res.send(JSON.stringify(fornecedor));
    } catch(err) {
        res.status(404).send(JSON.stringify({
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
        res.end();
        
    } catch(err) {
        res.status(400).send(JSON.stringify({
            mensagem: err.message
        }));
    }
});

module.exports = Router;