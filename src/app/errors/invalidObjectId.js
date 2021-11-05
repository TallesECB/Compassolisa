class invalidObjectId extends Error {
    constructor(id) {
        super();
        this.name = 'invalidObjectId';
        this.idErro = 1;
        this.statusCode = 400;
        
        this.description = 'Bad Request'
        this.name = `ID ${id} -> Invalid!`;
    }
}

module.exports = invalidObjectId;