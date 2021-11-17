const request = require('supertest');
const app = require('../../../src/app');

describe('Users', () => {
  it('Should User Get By Id and return status code 200', async () => {
    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(user);

    const getIdUniquePeopleInBD = await request(app).get('/api/v1/people/');

    const response = await request(app).get(`/api/v1/people/${getIdUniquePeopleInBD.body.usuarios[0]._id}`);

    expect(response.status).toBe(200);
  });

  it('Should getting the user by id and validating if the return matches the users data', async () => {
    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(user);

    const getIdUniquePeopleInBD = await request(app).get('/api/v1/people/');

    const response = await request(app).get(`/api/v1/people/${getIdUniquePeopleInBD.body.usuarios[0]._id}`);

    expect(response.body).toEqual({
      _id: getIdUniquePeopleInBD.body.usuarios[0]._id,
      nome: user.nome,
      cpf: user.cpf,
      data_nascimento: user.data_nascimento,
      email: user.email,
      habilitado: user.habilitado
    });
  });

  it('Should getting the user by id and validating the requests return type', async () => {
    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(user);

    const getIdUniquePeopleInBD = await request(app).get('/api/v1/people/');

    const response = await request(app).get(`/api/v1/people/${getIdUniquePeopleInBD.body.usuarios[0]._id}`);

    expect(response.body).toEqual({
      _id: expect.any(String),
      nome: expect.any(String),
      cpf: expect.any(String),
      data_nascimento: expect.any(String),
      email: expect.any(String),
      habilitado: expect.any(String)
    });
  });

  it('Should getting the user by id and and check if it returns the _id attribute of the user', async () => {
    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(user);

    const getIdUniquePeopleInBD = await request(app).get('/api/v1/people/');

    const response = await request(app).get(`/api/v1/people/${getIdUniquePeopleInBD.body.usuarios[0]._id}`);

    expect(response.body).toHaveProperty('_id');
  });

  it('Should reject User Get By Id and return error code 404 because this id was not found', async () => {
    const userId = {
      _id: '618c713666d870fc740b8510'
    };

    const response = await request(app).get(`/api/v1/people/${userId._id}`);

    expect(response.status).toBe(404);
  });

  it('Should reject User Get By Id and return error description and name because id was not found', async () => {
    const userId = {
      _id: '618c713666d870fc740b8510'
    };

    const response = await request(app).get(`/api/v1/people/${userId._id}`);

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should reject User Get By Id  and validating the requests return type, because id was not found', async () => {
    const userId = {
      _id: '618c713666d870fc740b8510'
    };

    const response = await request(app).get(`/api/v1/people/${userId._id}`);

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should reject User Get By Id and return error code 400 because this id have a invalid format', async () => {
    const userId = {
      _id: '618b166b363c64ea493b5e033'
    };

    const response = await request(app).get(`/api/v1/people/${userId._id}`);

    expect(response.status).toBe(400);
  });

  it('Should reject User Get By Id and return error description and name because this id have a invalid format', async () => {
    const userId = {
      _id: '618b166b363c64ea493b5e033'
    };

    const response = await request(app).get(`/api/v1/people/${userId._id}`);

    expect(response.body[0]).toHaveProperty('description');
    expect(response.body[0]).toHaveProperty('name');
  });

  it('Should reject User Get By Id and validating the requests return type, because this id have a invalid format', async () => {
    const userId = {
      _id: '618b166b363c64ea493b5e033'
    };

    const response = await request(app).get(`/api/v1/people/${userId._id}`);

    expect(response.body[0]).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });
});
