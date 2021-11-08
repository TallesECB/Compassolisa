class WithoutAccessory extends Error {
  constructor(car) {
    super();
    this.statusCode = 409;

    this.description = 'Conflict';
    this.name = `Car ${car} -> It is necessary to have at least one Accessory - Description!`;
  }
}

module.exports = WithoutAccessory;
