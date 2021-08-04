const Router = require('express').Router();
const table = require('./table');

Router.use('/', async (req, res) => {
    const resultados = await table.read();
    res.send(JSON.stringify(resultados));
});

module.exports = Router;