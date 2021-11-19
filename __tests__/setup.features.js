const setupDB = require('./support/cleanDatabase');
const Database = require('../src/infra/database/mongo/index');

global.afterEach(async () => setupDB());

global.beforeAll(async () => Database.connect());

global.afterAll(async () => Database.disconnect());
