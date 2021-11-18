const request = require('supertest');
const app = require('../../../src/app');

describe('Users', () => {
  it('Should reject Get by Query param and return status code 400, because CPF invalid format in query', async () => {
    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(user);

    const response = await request(app).get(`/api/v1/people/?cpf=012.345.789.11`);

    expect(response.status).toBe(400);
  });

  it('Should reject Get by Query param and return error description and error name, because CPF invalid format in query', async () => {
    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(user);

    const response = await request(app).get(`/api/v1/people/?cpf=012.345.789.11`);

    expect(response.body[0]).toHaveProperty('description');
    expect(response.body[0]).toHaveProperty('name');
  });

  it('Should reject Get by Query param and validating the requests return type, because CPF invalid format in query', async () => {
    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(user);

    const response = await request(app).get(`/api/v1/people/?cpf=012.345.789.11`);

    expect(response.body[0]).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should reject Get by Query param and return status code 400, because Query Not Found', async () => {
    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(user);

    const response = await request(app).get(`/api/v1/people/?nome=nomenotfound`);

    expect(response.status).toBe(404);
  });

  it('Should reject Get by Query param and return error description and error name, because Query Not Found', async () => {
    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(user);

    const response = await request(app).get(`/api/v1/people/?nome=nomenotfound`);

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should reject Get by Query param and validating the requests return type, because Query Not Found', async () => {
    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(user);

    const response = await request(app).get(`/api/v1/people/?nome=nomenotfound`);

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });
});
