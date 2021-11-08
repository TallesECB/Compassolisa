const mongoose = require('mongoose');

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    return mongoose.connect('mongodb://localhost:27017/projeto-final');
  }
}

module.exports = new Database().connect();
