const modelTable = require('./modelTable');
const NotFound = require('../../erros/NotFound');

module.exports = {
    create(fornecedor) {        
        return modelTable.create(fornecedor);
    },
    read() {
        return modelTable.findAll({ raw: true });
    },
    async searchForID(id) {
        const encontrado = await modelTable.findOne({
            where: { id }
        });

        if (!encontrado) {
            throw new NotFound('Fornecedor');
        }

        return encontrado;
    },
    update(id, dadosParaAtualizar) {
        return modelTable.update(
            dadosParaAtualizar,
            {
                where: { id }
            }
        );
    },
    delete(id) {
        return modelTable.destroy({
            where: { id },
        });
    }
}