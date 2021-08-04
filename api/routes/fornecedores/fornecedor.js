const table = require('./table');

class Fornecedor {

    constructor({
        id,
        empresa,
        email,
        categoria,
        dataCriacao,
        dataAtualizacao,
        versao
    }) {
        this.id = id;
        this.empresa = empresa;
        this.email = email;
        this.categoria = categoria;
        this.dataCriacao = dataCriacao;
        this.dataAtualizacao = dataAtualizacao;
        this.versao = versao;
    }

    async create() {

        const result = await table.create({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria,
        });

        this.id = result.id;
        this.dataCriacao = result.dataCriacao;
        this.dataAtualizacao = result.dataAtualizacao;
        this.versao = result.versao;

    }

    async searchForID() {
        const encontrado = await table.searchForID(this.id);
        this.empresa = encontrado.empresa;
        this.email = encontrado.email;
        this.categoria = encontrado.categoria;
        this.dataCriacao = encontrado.dataCriacao;
        this.dataAtualizacao = encontrado.dataAtualizacao;
        this.versao = encontrado.versao;
    }

    async update() {
        await table.searchForID(this.id);

        const campos = ['empresa', 'email', 'categoria'];
        const dadosParaAtualizar = {};

        campos.forEach((campo) => {
            const valor = this[campo];
            if (typeof valor === 'string' && valor.length > 0) {
                dadosParaAtualizar[campo] = valor;
            }
        });

        if (Object.keys(dadosParaAtualizar).length === 0) {
            throw new Error('Não foram fornecidos dados para atualizar!');
        }

        await table.update(this.id, dadosParaAtualizar);
    }

}

module.exports = Fornecedor;