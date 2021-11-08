class AuthInvalid extends Error {
  constructor() {
    super();
    this.statusCode = 400;

    this.description = 'Bad Request';
    this.name = `Email or PassWord -> Invalid!`;
  }
}

module.exports = AuthInvalid;
