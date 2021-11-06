class mainOfficeUnique extends Error {
    constructor(cnpj) {
        super();
        this.idErro = 8;
        this.statusCode = 400;

        this.description = 'Conflict';
        this.name = `CNPJ - ${cnpj} -> This rental company can only have one matrix!`;
    }   
}

module.exports = mainOfficeUnique;