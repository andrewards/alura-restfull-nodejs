const table = require('./table');
const InvalidField = require('../../erros/InvalidField');
const NotFoundData = require('../../erros/NotFoundData');

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
        await this.validar();

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
            throw new NotFoundData('Não foram fornecidos dados para atualizar!');
        }

        await table.update(this.id, dadosParaAtualizar);
    }

    async delete() {
        await table.searchForID(this.id);
        await table.delete(this.id);
    }

    async validar() {
        const campos = ['empresa', 'email', 'categoria'];

        const erros = [];

        campos.forEach(campo => {
            const valor = this[campo];
            if (valor === undefined) {
                throw new InvalidField(campo, 0);
            } else if (valor.length === 0) {
                throw new InvalidField(campo, 2);
            } else if (typeof valor !== 'string' || (campo === 'categoria' && !(valor === 'ração' || valor === 'brinquedo'))) {
                throw new InvalidField(campo, 1);
            }
        });
    }

}

module.exports = Fornecedor;