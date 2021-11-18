class UnderAge extends Error {
  constructor(user) {
    super();
    this.statusCode = 400;

    this.description = 'Bad Request';
    this.name = `User ${user} -> Underage must be over 18-Years!`;
  }
}

module.exports = UnderAge;
