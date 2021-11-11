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
    const people = {
      nome: 'Talles ECB',
      cpf: '013.391.972-33',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com.br',
      senha: 'talles123456',
      habilitado: 'sim'
    }

    await request(app).post('/api/v1/people/').send(people);

    const response = await request(app).post('/api/v1/authenticate').send({
      email: people.email,
      senha: people.senha
    });

    expect(response.status).toBe(201);
    expect(response.body.email).toBeUndefined();
    expect(response.body.habilitado).toBeUndefined();
    expect(response.body.nome).toBeUndefined();
    expect(response.body.cpf).toBeUndefined();
    expect(response.body.data_nascimento).toBeUndefined();
    expect(response.body.senha).toBeUndefined();
    expect(response.body).toHaveProperty('token');
    expect(typeof response.body.token).toBe('string');
  });

  it('should reject receive JWT token when authenticated with credentials invalid and return error code 400', async () => {
    const people = {
      nome: 'Talles ECB',
      cpf: '013.391.972-33',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com.br',
      senha: 'talles123456',
      habilitado: 'sim'
    }

    await request(app).post('/api/v1/people/').send(people);

    const response = await request(app).post('/api/v1/authenticate').send({
      email: people.email,
      senha: '12345678'
    });

    expect(response.status).toBe(400);
  });

  it('should reject receive JWT token when authenticated with credentials invalid and return error description and error name', async () => {
    const people = {
      nome: 'Talles ECB',
      cpf: '013.391.972-33',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com.br',
      senha: 'talles123456',
      habilitado: 'sim'
    }

    await request(app).post('/api/v1/people/').send(people);

    const response = await request(app).post('/api/v1/authenticate').send({
      email: people.email,
      senha: '12345678'
    });

    expect(response.body).toHaveProperty('description')
    expect(response.body).toHaveProperty('name')
  });

  it('should reject receive JWT token when authenticated with credentials invalid and validating the requests return type', async () => {
    const people = {
      nome: 'Talles ECB',
      cpf: '013.391.972-33',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com.br',
      senha: 'talles123456',
      habilitado: 'sim'
    }

    await request(app).post('/api/v1/people/').send(people);

    const response = await request(app).post('/api/v1/authenticate').send({
      email: people.email,
      senha: '12345678'
    });

    expect(typeof response.body.description).toBe('string')
    expect(typeof response.body.name).toBe('string')
  });
});

