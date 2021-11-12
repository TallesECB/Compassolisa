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

    expect(response.body.nome).toBe(user.nome);
    expect(response.body.cpf).toBe(user.cpf);
    expect(response.body.data_nascimento).toBe(user.data_nascimento);
    expect(response.body.email).toBe(user.email);
    expect(response.body.habilitado).toBe(user.habilitado);
    expect(response.body.senha).toBeUndefined();
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

    expect(typeof response.body.nome).toBe('string');
    expect(typeof response.body.cpf).toBe('string');
    expect(typeof response.body.data_nascimento).toBe('string');
    expect(typeof response.body.email).toBe('string');
    expect(typeof response.body.habilitado).toBe('string');
  });

  it('Should create a new User and check the return if it contains the _id property', async () => {
    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.777-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo777@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const response = await request(app).post('/api/v1/people/').send(user);

    expect(response.body).toHaveProperty('_id');
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

    expect(typeof response.body[0].description).toBe('string');
    expect(typeof response.body[0].name).toBe('string');
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
    expect(typeof response.body.description).toBe('string');
    expect(typeof response.body.name).toBe('string');
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

    expect(typeof response.body.description).toBe('string');
    expect(typeof response.body.name).toBe('string');
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

    expect(typeof response.body.description).toBe('string');
    expect(typeof response.body.name).toBe('string');
  });

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

    expect(response.body.nome).toBeUndefined();
    expect(response.body.cpf).toBeUndefined();
    expect(response.body.data_nascimento).toBeUndefined();
    expect(response.body.senha).toBeUndefined();
    expect(response.body.habilitado).toBeUndefined();
    expect(response.body._id).toBeUndefined();
  });

  it('Should reject user deletion and return error code 400, because this id was not found or it has already been deleted', async () => {
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

  it('Should reject user deletion and return error description and name, because this id was not found or it has already been deleted', async () => {
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

  it('Should reject user deletion and rvalidating the requests return type, because this id was not found or it has already been deleted', async () => {
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

    expect(typeof response.body.description).toBe('string');
    expect(typeof response.body.name).toBe('string');
  });

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

    expect(response.body.nome).toBe(user.nome);
    expect(response.body.cpf).toBe(user.cpf);
    expect(response.body.data_nascimento).toBe(user.data_nascimento);
    expect(response.body.email).toBe(user.email);
    expect(response.body.habilitado).toBe(user.habilitado);
    expect(response.body.senha).toBeUndefined();
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

    expect(typeof response.body.nome).toBe('string');
    expect(typeof response.body.cpf).toBe('string');
    expect(typeof response.body.data_nascimento).toBe('string');
    expect(typeof response.body.email).toBe('string');
    expect(typeof response.body.habilitado).toBe('string');
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

    expect(typeof response.body.description).toBe('string');
    expect(typeof response.body.name).toBe('string');
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

    expect(typeof response.body[0].description).toBe('string');
    expect(typeof response.body[0].name).toBe('string');
  });

  it('Should Update a User by ID and return status code 200', async () => {
    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const userUpdate = {
      nome: 'Talles Eduardo Carpes',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(user);

    const getIdUniqueUserlInBD = await request(app).get('/api/v1/people/');

    const response = await request(app)
      .put(`/api/v1/people/${getIdUniqueUserlInBD.body.usuarios[0]._id}`)
      .send(userUpdate);

    expect(response.status).toBe(200);
  });

  it('Should Update a User by ID and validating if the return matches the users data', async () => {
    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const userUpdate = {
      nome: 'Talles Eduardo Carpes',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(user);

    const getIdUniqueUserlInBD = await request(app).get('/api/v1/people/');

    const response = await request(app)
      .put(`/api/v1/people/${getIdUniqueUserlInBD.body.usuarios[0]._id}`)
      .send(userUpdate);

    expect(response.body.senha).toBeUndefined();
    expect(response.body.nome).toBe(userUpdate.nome);
    expect(response.body.cpf).toBe(userUpdate.cpf);
    expect(response.body.data_nascimento).toBe(userUpdate.data_nascimento);
    expect(response.body.email).toBe(userUpdate.email);
    expect(response.body.habilitado).toBe(userUpdate.habilitado);
  });

  it('Should Update User by id and and check if it returns the _id attribute of the user', async () => {
    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const userUpdate = {
      nome: 'Talles Eduardo Carpes',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(user);

    const getIdUniquePeopleInBD = await request(app).get('/api/v1/people/');

    const response = await request(app)
      .put(`/api/v1/people/${getIdUniquePeopleInBD.body.usuarios[0]._id}`)
      .send(userUpdate);

    expect(response.body).toHaveProperty('_id');
  });

  it('Should Update User by id and validating the requests return type', async () => {
    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const userUpdate = {
      nome: 'Talles Eduardo Carpes',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(user);

    const getIdUniquePeopleInBD = await request(app).get('/api/v1/people/');

    const response = await request(app)
      .put(`/api/v1/people/${getIdUniquePeopleInBD.body.usuarios[0]._id}`)
      .send(userUpdate);

    expect(typeof response.body._id).toBe('string');
    expect(typeof response.body.nome).toBe('string');
    expect(typeof response.body.cpf).toBe('string');
    expect(typeof response.body.data_nascimento).toBe('string');
    expect(typeof response.body.email).toBe('string');
    expect(typeof response.body.habilitado).toBe('string');
  });

  it('Should reject User Update By Id and return error code 404 because this id was not found', async () => {
    const userId = {
      _id: '618c713666d870fc740b8510'
    };

    const userUpdate = {
      nome: 'Talles Eduardo Carpes',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const response = await request(app).put(`/api/v1/people/${userId._id}`).send(userUpdate);

    expect(response.status).toBe(404);
  });

  it('Should reject User Update By Id and return error description and name because id was not found', async () => {
    const userId = {
      _id: '618c713666d870fc740b8510'
    };

    const userUpdate = {
      nome: 'Talles Eduardo Carpes',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const response = await request(app).put(`/api/v1/people/${userId._id}`).send(userUpdate);
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should reject User Update By Id and validating the requests return type, because id was not found', async () => {
    const userId = {
      _id: '618c713666d870fc740b8510'
    };

    const userUpdate = {
      nome: 'Talles Eduardo Carpes',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const response = await request(app).put(`/api/v1/people/${userId._id}`).send(userUpdate);
    expect(typeof response.body.description).toBe('string');
    expect(typeof response.body.name).toBe('string');
  });

  it('Should reject update a User by ID and return error code 400 because one or more requireds attributes are missing', async () => {
    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const userUpdate = {
      nome: 'Talles Eduardo Carpes',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(user);

    const getIdUniquePeopleInBD = await request(app).get('/api/v1/people/');

    const response = await request(app)
      .put(`/api/v1/people/${getIdUniquePeopleInBD.body.usuarios[0]._id}`)
      .send(userUpdate);

    expect(response.status).toBe(400);
  });

  it('Should reject update a User by ID and return error description and name, because one or more requireds attributes are missing', async () => {
    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const userUpdate = {
      nome: 'Talles Eduardo Carpes',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(user);

    const getIdUniquePeopleInBD = await request(app).get('/api/v1/people/');

    const response = await request(app)
      .put(`/api/v1/people/${getIdUniquePeopleInBD.body.usuarios[0]._id}`)
      .send(userUpdate);

    expect(response.body[0]).toHaveProperty('description');
    expect(response.body[0]).toHaveProperty('name');
  });

  it('Should reject update a User by ID and validating the requests return type, because one or more requireds attributes are missing', async () => {
    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.789-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const userUpdate = {
      nome: 'Talles Eduardo Carpes',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(user);

    const getIdUniquePeopleInBD = await request(app).get('/api/v1/people/');

    const response = await request(app)
      .put(`/api/v1/people/${getIdUniquePeopleInBD.body.usuarios[0]._id}`)
      .send(userUpdate);

    expect(typeof response.body[0].description).toBe('string');
    expect(typeof response.body[0].name).toBe('string');
  });
});
