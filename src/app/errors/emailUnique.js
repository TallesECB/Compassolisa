class EmailUnique extends Error {
  constructor(email) {
    super();
    this.statusCode = 409;

    this.description = 'Conflict';
    this.name = `Email - ${email} -> Already in Use!`;
  }
}

module.exports = EmailUnique;
