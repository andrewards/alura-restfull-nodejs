const modelTable = require('./modelTable');

module.exports = {
    read(fornecedor) {
        return modelTable.findAll({
            where: { fornecedor }
        });
    },
};