const NotSupportedType = require('./erros/NotSupportedType');

class Serializador {

    json(data) {
        return JSON.stringify(data);
    }

    serializar(data) {
        if (this.contentType === 'application/json') {
            return this.json(data);
        }

        throw new NotSupportedType(this.contentType);
    }
}

class SerializadorFornecedor extends Serializador {

    constructor(contentType) {
        super();
        this.contentType = contentType;
    }
}

module.exports = {
    Serializador,
    SerializadorFornecedor,
    acceptedTypes: [
        'application/json',
    ],
};