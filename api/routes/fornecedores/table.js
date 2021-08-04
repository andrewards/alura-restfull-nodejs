const modelTable = require('./modelTabel');

module.exports = {
    read() {
        return modelTable.findAll();
    }
}