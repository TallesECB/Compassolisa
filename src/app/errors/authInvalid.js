class authInvalid extends Error {
    constructor() {
        super();
        this.name = 'authInvalid';
        this.idErro = 4;
        this.statusCode = 400;
        
        this.description = 'Bad Request'
        this.name = `Email or PassWord -> Invalid!`;
    }   
}

module.exports = authInvalid;