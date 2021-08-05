const jsontoxml = require('jsontoxml');
const NotSupportedType = require('./erros/NotSupportedType');

class Serializador {

    json(data) {
        return JSON.stringify(data);
    }

    xml(data) {
        let tag = this.tagSingular;

        if (Array.isArray(data)) {
            tag = this.tagPlural;
            data = data.map(item => {
                return {
                    [this.tagSingular]: item,
                };
            });
        }
        return jsontoxml({
            [tag]: data,
        });
    }

    serializar(data) {
        data = this.filter(data);

        if (this.contentType === 'application/json') {
            return this.json(data);
        } else if (this.contentType === 'application/xml') {
            return this.xml(data);
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
        this.tagSingular = 'fornecedor';
        this.tagPlural = 'fornecedores';
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
        this.tagSingular = 'erro';
        this.tagPlural = 'erros';
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
        'application/xml',
    ],
};