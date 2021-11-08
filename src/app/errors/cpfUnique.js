class cpfUnique extends Error {
    constructor(cpf) {
        super();
        this.statusCode = 400;

        this.description = 'Conflict'
        this.name = `CPF - ${cpf} -> Already in Use!`;
    }   
}

module.exports = cpfUnique;