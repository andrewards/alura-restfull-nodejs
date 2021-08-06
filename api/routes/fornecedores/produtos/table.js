const modelTable = require('./modelTable');

module.exports = {
    create(data) {
        return modelTable.create(data);
    },
    read(fornecedor) {
        return modelTable.findAll({
            where: { fornecedor }
        });
    },
};