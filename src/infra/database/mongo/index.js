const mongoose = require('mongoose');
const config = require('../../../app/config/config');

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    return mongoose.connect(`mongodb://${config.database.host}/${config.database.collection}`);
  }

  disconnect() {
    return mongoose.connection.close();
  }
}

module.exports = new Database();
