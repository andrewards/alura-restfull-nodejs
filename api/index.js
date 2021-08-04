const express = require('express');
const config = require('config');

const app = express();
app.use(express.json());

const Router = require('./routes/fornecedores');
app.use('/api/fornecedores', Router);

app.listen(config.get('api.port'), () => console.log('A API está funcionando...'));