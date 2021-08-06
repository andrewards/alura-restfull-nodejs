class NotFound extends Error {

    constructor(entity) {
        super(`${entity} não encontrado!`);
        this.name = 'NaoEncontrado';
        this.idErro = 0;
    }

}

module.exports = NotFound;