class limitPagination extends Error {
    constructor(limit) {
        super();
        this.statusCode = 400;
        
        this.description = 'Bad Request'
        this.name = `Limit ${limit} -> Must be less than or equal to 1, Greater than or equal to 1000!`;
    }   
}

module.exports = limitPagination;