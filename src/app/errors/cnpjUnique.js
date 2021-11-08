class cnpjUnique extends Error {
    constructor(cnpj) {
        super();
        this.statusCode = 400;

        this.description = 'Conflict'
        this.name = `CNPJ - ${cnpj} -> Already in Use!`;
    }   
}

module.exports = cnpjUnique;