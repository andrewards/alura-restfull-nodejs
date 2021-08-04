const tabel = require('./table');

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

        const result = await tabel.create({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria,
        });

        this.id = result.id;
        this.dataCriacao = result.dataCriacao;
        this.dataAtualizacao = result.dataAtualizacao;
        this.versao = result.versao;

    }

}

module.exports = Fornecedor;