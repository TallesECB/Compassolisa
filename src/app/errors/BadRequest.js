class BadRequest extends Error {
  constructor(mensagem) {
    super();
    this.statusCode = 400;

    this.description = 'Bad Request';
    this.name = `${mensagem}`;
  }
}

module.exports = BadRequest;
