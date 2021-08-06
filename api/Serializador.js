const jsontoxml = require('jsontoxml');
const NotSupportedType = require('./erros/NotSupportedType');

class Serializador {

    constructor(contentType, publicData, extraTypes=[], tagS, tagP=undefined) {
        this.contentType = contentType;
        this.publicData = publicData.concat(extraTypes);
        this.tagSingular = tagS;
        this.tagPlural = tagP;
    }

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
        super(contentType, [
            'id',
            'categoria',
        ], extraTypes, 'fornecedor', 'fornecedores');
    }
}

class SerializadorProduto extends Serializador {

    constructor(contentType, extraTypes=[]) {
        super(contentType, [
            'id',
            'titulo',
        ], extraTypes, 'produto', 'produtos');
    }
}

class SerializadorErro extends Serializador {
    
    constructor(contentType, extraTypes=[]) {
        super(contentType, [
            'error',
            'code',
        ], extraTypes, 'erro', 'erros');   
    }
}

module.exports = {
    Serializador,
    SerializadorFornecedor,
    SerializadorProduto,
    SerializadorErro,
    acceptedTypes: [
        'application/json',
        'application/xml',
    ],
};