const request = require('supertest');
const app = require('../../src/app');
const Database = require('../../src/infra/database/mongo/index');
const UserSchema = require('../../src/app/schema/UserSchema');

Database.connect();

beforeAll(async () => {
  await UserSchema.deleteMany();
});

beforeEach(async () => {
  await UserSchema.deleteMany();
});

afterAll(async () => {
  await UserSchema.deleteMany();
  Database.disconnect();
});

describe('Authentication', () => {
  it('should receive JWT token when authenticated with valid credentials and status', async () => {
    const people = await UserSchema.create({
      nome: 'Talles ECB',
      cpf: '013.391.972-33',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com.br',
      senha: 'talles86526696',
      habilitado: 'sim'
    });

    const response = await request(app).post('/api/v1/authenticate').send({
      email: people.email,
      senha: people.senha,
      habilitado: people.habilitado
    });
    expect(response.status).toBe(201);
    expect(response.body.email).toBe(undefined);
    expect(response.body.habilitado).toBe(undefined);
    expect(response.body.nome).toBe(undefined);
    expect(response.body.cpf).toBe(undefined);
    expect(response.body.data_nascimento).toBe(undefined);
    expect(response.body.senha).toBe(undefined);
    expect(typeof response.body.token).toBe('string');
  });
});
