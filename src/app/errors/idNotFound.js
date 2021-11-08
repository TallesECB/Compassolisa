class IdNotFound extends Error {
  constructor(id) {
    super();
    this.statusCode = 404;

    this.description = 'Not Found';
    this.name = `ID ${id} -> Not Found!`;
  }
}

module.exports = IdNotFound;
