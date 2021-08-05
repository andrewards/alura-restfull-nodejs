const NotSupportedType = require('./erros/NotSupportedType');

class Serializador {

    json(data) {
        return JSON.stringify(data);
    }

    serializar(data) {
        if (this.contentType === 'application/json') {
            return this.json(this.filter(data));
        }

        throw new NotSupportedType(this.contentType);
    }

    filterObject(data) {
        const sendData = {};

        this.publicData.forEach(field => {
            if (data.hasOwnProperty(field)) sendData[field] = data[field];
        });

        return sendData;
    }

    filter(data) {
        if (Array.isArray(data)) {
            data = data.map(item => this.filterObject(item));
        } else {
            data = this.filterObject(data);
        }

        return data;
    }
}

class SerializadorFornecedor extends Serializador {

    constructor(contentType, extraTypes=[]) {
        super();
        this.contentType = contentType;
        this.publicData = [
            'id',
            'empresa',
            'categoria'
        ].concat(extraTypes);
    }
}

class SerializadorErro extends Serializador {
    
    constructor(contentType, extraTypes=[]) {
        super();
        this.contentType = contentType;
        this.publicData = [
            'error',
            'code',
        ].concat(extraTypes);
    }
}

module.exports = {
    Serializador,
    SerializadorFornecedor,
    SerializadorErro,
    acceptedTypes: [
        'application/json',
    ],
};