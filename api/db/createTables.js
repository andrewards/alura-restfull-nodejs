const models = [
    require('../routes/fornecedores/modelTable'),
    require('../routes/fornecedores/produtos/modelTable'),
];

async function createTables() {
    models.forEach(async model => {
        await model.sync();
    });
}

createTables();