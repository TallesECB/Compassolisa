const setupDB = require('./support/cleanDatabase');
const Database = require('../src/infra/database/mongo/index');

global.afterEach(async () => setupDB());

global.beforeAll(async () => {
    return Database.connect();
});
  
global.afterAll(async () => {
    return Database.disconnect();
});