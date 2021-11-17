const request = require('supertest');
const app = require('../../../src/app');

describe('Users', () => {
  it('Should create a new User return status code 201', async () => {
    const user = {
      nome: 'Talles ECB',
      cpf: '012.777.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo777@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const response = await request(app).post('/api/v1/people/').send(user);

    expect(response.status).toBe(201);
  });

  it('Should create a new User and verify the return body with the request body ', async () => {
    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.777-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo777@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const response = await request(app).post('/api/v1/people/').send(user);

    expect(response.body).toEqual({
      _id: response.body._id,
      nome: user.nome,
      cpf: user.cpf,
      data_nascimento: user.data_nascimento,
      email: user.email,
      habilitado: user.habilitado,
      token: response.body.token
    });
  });

  it('Should create a new User and validating the requests return type', async () => {
    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.777-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo777@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const response = await request(app).post('/api/v1/people/').send(user);

    expect(response.body).toEqual({
      _id: expect.any(String),
      nome: expect.any(String),
      cpf: expect.any(String),
      data_nascimento: expect.any(String),
      email: expect.any(String),
      habilitado: expect.any(String),
      token: expect.any(String)
    });
  });

  it('Should reject create a new User and return error code 400 because one or more requireds attributes are missing', async () => {
    const user = {
      nome: 'Talles ECB',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const response = await request(app).post('/api/v1/people/').send(user);

    expect(response.status).toBe(400);
  });

  it('Should reject create a new User and return error description and name because one or more requireds attributes are missing', async () => {
    const user = {
      nome: 'Talles ECB',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const response = await request(app).post('/api/v1/people/').send(user);

    expect(response.body[0]).toHaveProperty('description');
    expect(response.body[0]).toHaveProperty('name');
  });

  it('Should reject create a new User and validating the requests return type, because one or more requireds attributes are missing', async () => {
    const user = {
      nome: 'Talles ECB',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const response = await request(app).post('/api/v1/people/').send(user);

    expect(response.body[0]).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should create a new User return error code 409 because is the cpf repeating on the bd ', async () => {
    const userOne = {
      nome: 'Talles ECB',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const userTwo = {
      nome: 'Talles ECB',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };
    await request(app).post('/api/v1/people/').send(userOne);

    const response = await request(app).post('/api/v1/people/').send(userTwo);

    expect(response.status).toBe(409);
  });

  it('Should create a new User return error description and name because is the cpf repeating on the bd', async () => {
    const userOne = {
      nome: 'Talles ECB',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const userTwo = {
      nome: 'Talles ECB',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(userOne);

    const response = await request(app).post('/api/v1/people/').send(userTwo);

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should create a new User and validating the requests return type, because is the cpf repeating on the bd', async () => {
    const userOne = {
      nome: 'Talles ECB',
      cpf: '012.345.789-51',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const userTwo = {
      nome: 'Talles ECB',
      cpf: '012.345.789-31',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(userOne);

    const response = await request(app).post('/api/v1/people/').send(userTwo);

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should create a new User return error code 409, because is the email repeating on the bd', async () => {
    const userOne = {
      nome: 'Talles ECB',
      cpf: '012.345.789-51',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const userTwo = {
      nome: 'Talles ECB',
      cpf: '012.345.789-31',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };
    await request(app).post('/api/v1/people/').send(userOne);

    const response = await request(app).post('/api/v1/people/').send(userTwo);

    expect(response.status).toBe(409);
  });

  it('Should create a new User return error description and name, because is the email repeating on the bd', async () => {
    const userOne = {
      nome: 'Talles ECB',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const userTwo = {
      nome: 'Talles ECB',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(userOne);

    const response = await request(app).post('/api/v1/people/').send(userTwo);

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should create a new User and validating the requests return type, because is the email repeating on the bd', async () => {
    const userOne = {
      nome: 'Talles ECB',
      cpf: '012.345.789-51',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const userTwo = {
      nome: 'Talles ECB',
      cpf: '012.345.789-31',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(userOne);

    const response = await request(app).post('/api/v1/people/').send(userTwo);

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should create a new User return error code 400, because user is Under Age', async () => {
    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.789-51',
      data_nascimento: '01/05/2005',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };
    const response = await request(app).post('/api/v1/people/').send(user);

    expect(response.status).toBe(400);
  });

  it('Should create a new User return error description and name, because user is Under Age', async () => {
    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2005',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const response = await request(app).post('/api/v1/people/').send(user);

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should create a new User and validating the requests return type, because user is Under Age', async () => {
    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.789-51',
      data_nascimento: '01/05/2005',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const response = await request(app).post('/api/v1/people/').send(user);

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });
});
