class NotSupportedType extends Error {

    constructor(contentType) {
        super(`Conteúdo em ${contentType} não é suportado!`);
        this.name = 'TipoNaoSuportado';
        this.idErro = 3;
    }
}

module.exports = NotSupportedType;