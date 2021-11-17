const database = require('../../src/infra/database/mongo/index');

const cleanDatabase = async () => {
  const db = await database;
  for (const collection of Object.keys(db.connection.collections)) {
    db.connection.collections[collection].deleteMany({});
  }
};

module.exports = cleanDatabase;
