const NotFoundData = require('../../../erros/NotFoundData');
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

    delete() {
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

    async update() {
        const updateData = {};

        if (typeof this.titulo === 'string'
            && this.titulo.length > 0) {
            updateData.titulo = this.titulo;
        }

        if (typeof this.preco === 'number'
            && this.preco > 0) {
            updateData.preco = this.preco;
        }

        if (typeof this.estoque === 'number'
            && this.estoque >= 0) {
            updateData.estoque = this.estoque;
        }

        if (Object.keys(updateData).length === 0) {
            throw new NotFoundData();
        }

        return table.update({
            id: this.id,
            fornecedor: this.fornecedor,
        }, updateData);
    }

    sell(qtd) {
        this.estoque -= qtd;

        return table.sell({
            id: this.id,
            fornecedor: this.fornecedor
        }, this.estoque);
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