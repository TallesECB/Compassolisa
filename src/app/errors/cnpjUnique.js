class cnpjUnique extends Error {
    constructor(cnpj) {
        super();
        this.idErro = 6;
        this.statusCode = 400;

        this.description = 'Conflict'
        this.name = `CNPJ - ${cnpj} -> Already in Use!`;
    }   
}

module.exports = cnpjUnique;