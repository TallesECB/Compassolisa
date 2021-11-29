const mongoose = require('mongoose');

require('../../../app/config/config');

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    return mongoose.connect(process.env.MONGO_URL);
  }

  disconnect() {
    return mongoose.connection.close();
  }
}

module.exports = new Database();
