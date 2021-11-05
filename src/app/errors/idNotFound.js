class idNotFound extends Error {
    constructor(id) {
        super();
        this.name = 'idNotFound';
        this.idErro = 0;
        this.statusCode = 404;
        
        this.description = 'Not Found'
        this.name = `ID ${id} -> Not Found!`;
    }   
}

module.exports = idNotFound;