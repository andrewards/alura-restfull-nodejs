const table = require('./table');

class Produto {

    constructor({
        id,
        titulo,
        preco,
        estoque,
        fornecedor,
        dataCriacao,
        dataAtualizacao,
        versao,
    }) {
        this.id = id;
        this.titulo = titulo;
        this.preco = preco;
        this.estoque = estoque;
        this.fornecedor = fornecedor;
        this.dataCriacao = dataCriacao;
        this.dataAtualizacao = dataAtualizacao;
        this.versao = versao;
    }

    async create() {
        this.validar();
        const result = await table.create({
            titulo: this.titulo,
            preco: this.preco,
            estoque: this.estoque,
            fornecedor: this.fornecedor,
        });

        this.id = result.id;
        this.dataCriacao = result.dataCriacao;
        this.dataAtualizacao = result.dataAtualizacao;
        this.versao = result.versao;
    }

    async delete() {
        return table.delete(this.id, this.fornecedor);
    }

    async searchForID() {
        const produto = await table.searchForID(this.id, this.fornecedor);
        this.titulo = produto.titulo;
        this.preco = produto.preco;
        this.estoque = produto.estoque;
        this.dataCriacao = produto.dataCriacao;
        this.dataAtualizacao = produto.dataAtualizacao;
        this.versao = produto.versao;
    }

    validar() {
        if (typeof this.titulo !== 'string'
            || this.titulo.length === 0) {
            throw new Error('Campo titulo inválido!');
        }
        if (typeof this.preco !== 'number'
            || this.preco <= 0) {
            throw new Error('Campo preco inválido!');
        }
    }
}

module.exports = Produto;