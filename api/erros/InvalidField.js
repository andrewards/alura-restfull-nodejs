class InvalidField extends Error {

    constructor(campo, type) {

        const types = [
            'Campo `{campo}` não informado!',
            'Campo `{campo}` inválido!',
            'Campo `{campo}` vazio!',
        ];

        super(types[type].replace('{campo}', campo));
        this.name = 'CampoInvalido';
        this.idErro = 1;
        this.errors = campo;
    }
}

module.exports = InvalidField; 