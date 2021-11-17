class Conflict extends Error {
  constructor(conflictError) {
    super();
    this.statusCode = 409;

    this.description = 'Conflict';
    this.name = `${conflictError} -> Already in Use!`;
  }
}

module.exports = Conflict;
