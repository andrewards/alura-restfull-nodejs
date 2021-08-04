const express = require('express');
const config = require('config');
const Router = require('./routes/fornecedores');
const NotFound = require('./erros/NotFound');

const app = express();
app.use(express.json());

app.use('/api/fornecedores', Router);

app.use((err, req, res, next) => {
    if (err instanceof NotFound) {
        res.status(404);
    } else {
        res.status(400);
    }

    res.send(JSON.stringify({
        mensagem: err.message,
        id: err.idErro,
    }));
    
});

app.listen(config.get('api.port'), () => console.log('A API está funcionando...'));