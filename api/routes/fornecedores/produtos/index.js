const Router = require('express').Router();

Router.get('/', (req, res) => {
    res.send(JSON.stringify([]));
});

module.exports = Router;