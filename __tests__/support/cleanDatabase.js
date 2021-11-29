const mongoose = require('mongoose');
require('../../src/infra/database/mongo/index');

const cleanDatabase = async () => {
  const collecttions = Object.keys(mongoose.connection.collections);
  await Promise.all(
    collecttions.map(async (collection) => {
      await mongoose.connection.collections[collection].deleteMany({});
    })
  );
};

module.exports = cleanDatabase;
