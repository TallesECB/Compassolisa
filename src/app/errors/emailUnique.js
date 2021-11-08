class emailUnique extends Error {
    constructor(email) {
        super();
        this.statusCode = 400;

        this.description = 'Conflict';
        this.name = `Email - ${email} -> Already in Use!`;
    }   
}

module.exports = emailUnique;