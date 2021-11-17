const request = require('supertest');
const app = require('../../../src/app');

describe('Users', () => {
  it('Should delete user return status code 204', async () => {
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

    const response = await request(app).delete(`/api/v1/people/${getIdUniquePeopleInBD.body.usuarios[0]._id}`);

    expect(response.status).toBe(204);
  });

  it('Should delete user and return empty body', async () => {
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

    const response = await request(app).delete(`/api/v1/people/${getIdUniquePeopleInBD.body.usuarios[0]._id}`);

    expect(response.body).toEqual({});
  });

  it('Should reject user delete and return error code 400, because this id was not found or it has already been deleted', async () => {
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

    await request(app).delete(`/api/v1/people/${getIdUniquePeopleInBD.body.usuarios[0]._id}`);

    const response = await request(app).delete(`/api/v1/people/${getIdUniquePeopleInBD.body.usuarios[0]._id}`);

    expect(response.status).toBe(404);
  });

  it('Should reject user delete and return error description and name, because this id was not found or it has already been deleted', async () => {
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

    await request(app).delete(`/api/v1/people/${getIdUniquePeopleInBD.body.usuarios[0]._id}`);

    const response = await request(app).delete(`/api/v1/people/${getIdUniquePeopleInBD.body.usuarios[0]._id}`);

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should reject user delete and rvalidating the requests return type, because this id was not found or it has already been deleted', async () => {
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

    await request(app).delete(`/api/v1/people/${getIdUniquePeopleInBD.body.usuarios[0]._id}`);

    const response = await request(app).delete(`/api/v1/people/${getIdUniquePeopleInBD.body.usuarios[0]._id}`);

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });
});
