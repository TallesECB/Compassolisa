class underAge extends Error {
    constructor(user) {
        super();
        this.name = 'underAge';
        this.idErro = 2;
        this.statusCode = 400;
        
        this.description = 'Bad Request'
        this.name = `User ${user} -> Underage must be over 18-Years!`;
    }   
}

module.exports = underAge;