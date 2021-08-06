const NotFound = require('../../../erros/NotFound');
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
    async searchForID(id, fornecedor) {
        const encontrado = await modelTable.findOne({
            where: {
                id,
                fornecedor,
            },
            raw: true,
        });

        if (!encontrado) {
            throw new NotFound('Produto');
        }

        return encontrado;
    },
    delete(id, fornecedor) {
        return modelTable.destroy({
            where: {
                id,
                fornecedor,
            }
        });
    },
};