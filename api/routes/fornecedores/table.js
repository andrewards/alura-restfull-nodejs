const modelTable = require('./modelTabel');

module.exports = {
    create(fornecedor) {        
        return modelTable.create(fornecedor);
    },
    read() {
        return modelTable.findAll();
    },
}