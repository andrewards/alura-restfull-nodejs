const modelTable = require('../routes/fornecedores/modelTabel');

modelTable.sync()
    .then(() => console.log('Tabela criada com sucesso!'))
    .catch(console.log);