const express = require('express');
const config = require('config');
const Router = require('./routes/fornecedores');
const NotFound = require('./erros/NotFound');
const InvalidField = require('./erros/InvalidField');
const NotFoundData = require('./erros/NotFoundData');
const NotSupportedType = require('./erros/NotSupportedType');
const { acceptedTypes } = require('./Serializador');

const app = express();
app.use(express.json());

// middleware content-type
app.use((req, res, next) => {
    const formatoRequisitado = req.headers.accept === '*/*' ? 'application/json' : req.headers.accept;

    if (acceptedTypes.indexOf(formatoRequisitado) === -1) return res.status(406).end();

    res.setHeader('Content-Type', formatoRequisitado);
    next();
});

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