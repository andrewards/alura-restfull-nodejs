const express = require('express');
const config = require('config');
const Router = require('./routes/fornecedores');
const NotFound = require('./erros/NotFound');
const InvalidField = require('./erros/InvalidField');
const NotFoundData = require('./erros/NotFoundData');
const NotSupportedType = require('./erros/NotSupportedType');

const app = express();
app.use(express.json());

app.use('/api/fornecedores', Router);

app.use((err, req, res, next) => {

    let status = 500;
    if (err instanceof NotFound) {
        status = 404;
    } else if (err instanceof InvalidField
        || err instanceof NotFoundData) {
        status = 400;
    } else if (err instanceof NotSupportedType) {
        status = 406;
    }

    res.status(status);

    res.send(JSON.stringify({
        erro: err.message,
        code: err.idErro,
    }));
    
});

app.listen(config.get('api.port'), () => console.log('A API está funcionando...'));