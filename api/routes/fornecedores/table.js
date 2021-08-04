const modelTable = require('./modelTabel');

module.exports = {
    create(fornecedor) {        
        return modelTable.create(fornecedor);
    },
    read() {
        return modelTable.findAll();
    },
    async searchForID(id) {
        const encontrado = await modelTable.findOne({
            where: { id }
        });

        if (!encontrado) {
            throw new Error('Fornecedor não encontrado!');
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
    }
}