class WithoutAccessory extends Error {
  constructor(car) {
    super();
    this.statusCode = 400;

    this.description = 'Bad Request';
    this.name = `Car ${car} -> It is necessary to have at least one Accessory - Description!`;
  }
}

module.exports = WithoutAccessory;
