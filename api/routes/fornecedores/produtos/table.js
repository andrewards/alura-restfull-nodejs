const NotFound = require('../../../erros/NotFound');
const modelTable = require('./modelTable');
const instancia = require('../../../db');

module.exports = {
    create(data) {
        return modelTable.create(data);
    },
    read(fornecedor, criterios={}) {
        criterios.fornecedor = fornecedor;
        return modelTable.findAll({
            where: criterios,
            raw: true,
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
    update(data, updateData) {
        return modelTable.update(updateData, {
            where: data,
        });
    },
    sell(where, estoque) {
        return instancia.transaction(async transacao => {
            const produto = await modelTable.findOne({ where });

            produto.estoque = estoque;
            await produto.save();
            return produto;
        });
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