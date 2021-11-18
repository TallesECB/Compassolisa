class NotFound extends Error {
  constructor(id) {
    super();
    this.statusCode = 404;

    this.description = 'Not Found';
    this.name = `${id} -> Not Found!`;
  }
}

module.exports = NotFound;
