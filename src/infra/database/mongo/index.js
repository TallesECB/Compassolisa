const mongoose = require('mongoose');

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
