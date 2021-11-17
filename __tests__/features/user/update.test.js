const request = require('supertest');
const app = require('../../../src/app');

describe('Users', () => {
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

    expect(response.body).toEqual({
      _id: getIdUniqueUserlInBD.body.usuarios[0]._id,
      nome: userUpdate.nome,
      cpf: userUpdate.cpf,
      data_nascimento: userUpdate.data_nascimento,
      email: userUpdate.email,
      habilitado: userUpdate.habilitado
    });
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

    expect(response.body).toEqual({
      _id: expect.any(String),
      nome: expect.any(String),
      cpf: expect.any(String),
      data_nascimento: expect.any(String),
      email: expect.any(String),
      habilitado: expect.any(String)
    });
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

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
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

    expect(response.body[0]).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should reject update User and return error code 409 because is the cpf repeating on the bd', async () => {
    const userMock = {
      nome: 'Talles ECB',
      cpf: '012.345.777-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.888-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo14@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const userUpdate = {
      nome: 'Talles ECB',
      cpf: '012.345.777-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo14@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(user);
    await request(app).post('/api/v1/people/').send(userMock);

    const getIdPrimaryPeopleInBD = await request(app).get('/api/v1/people/');

    const response = await request(app)
      .put(`/api/v1/people/${getIdPrimaryPeopleInBD.body.usuarios[0]._id}`)
      .send(userUpdate);

    expect(response.status).toBe(409);
  });

  it('Should reject update User and return error description and name because is the cpf repeating on the bd', async () => {
    const userMock = {
      nome: 'Talles ECB',
      cpf: '012.345.777-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.888-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo14@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const userUpdate = {
      nome: 'Talles ECB',
      cpf: '012.345.777-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo14@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(user);
    await request(app).post('/api/v1/people/').send(userMock);

    const getIdPrimaryPeopleInBD = await request(app).get('/api/v1/people/');

    const response = await request(app)
      .put(`/api/v1/people/${getIdPrimaryPeopleInBD.body.usuarios[0]._id}`)
      .send(userUpdate);

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should reject update User and validating the requests return type, because is the cpf repeating on the bd', async () => {
    const userMock = {
      nome: 'Talles ECB',
      cpf: '012.345.777-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo13@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.888-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo14@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const userUpdate = {
      nome: 'Talles ECB',
      cpf: '012.345.777-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo14@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(user);
    await request(app).post('/api/v1/people/').send(userMock);

    const getIdPrimaryPeopleInBD = await request(app).get('/api/v1/people/');

    const response = await request(app)
      .put(`/api/v1/people/${getIdPrimaryPeopleInBD.body.usuarios[0]._id}`)
      .send(userUpdate);

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should reject update User and return error code 409, because is the email repeating on the bd', async () => {
    const userMock = {
      nome: 'Talles ECB',
      cpf: '012.345.777-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo133@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.888-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo144@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const userUpdate = {
      nome: 'Talles ECB',
      cpf: '012.345.888-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo133@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(user);
    await request(app).post('/api/v1/people/').send(userMock);

    const getIdPrimaryPeopleInBD = await request(app).get('/api/v1/people/');

    const response = await request(app)
      .put(`/api/v1/people/${getIdPrimaryPeopleInBD.body.usuarios[0]._id}`)
      .send(userUpdate);

    expect(response.status).toBe(409);
  });

  it('Should reject update User and return error description and name, because is the email repeating on the bd', async () => {
    const userMock = {
      nome: 'Talles ECB',
      cpf: '012.345.777-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo133@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.888-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo144@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const userUpdate = {
      nome: 'Talles ECB',
      cpf: '012.345.888-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo133@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(user);
    await request(app).post('/api/v1/people/').send(userMock);

    const getIdPrimaryPeopleInBD = await request(app).get('/api/v1/people/');

    const response = await request(app)
      .put(`/api/v1/people/${getIdPrimaryPeopleInBD.body.usuarios[0]._id}`)
      .send(userUpdate);

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should reject update User and validating the requests return type, because is the email repeating on the bd', async () => {
    const userMock = {
      nome: 'Talles ECB',
      cpf: '012.345.777-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo133@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.888-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo144@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const userUpdate = {
      nome: 'Talles ECB',
      cpf: '012.345.888-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo133@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(user);
    await request(app).post('/api/v1/people/').send(userMock);

    const getIdPrimaryPeopleInBD = await request(app).get('/api/v1/people/');

    const response = await request(app)
      .put(`/api/v1/people/${getIdPrimaryPeopleInBD.body.usuarios[0]._id}`)
      .send(userUpdate);

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should reject update User and return error code 409, because User cannot be underage', async () => {
    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.888-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo144@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const userUpdate = {
      nome: 'Talles ECB',
      cpf: '012.345.888-11',
      data_nascimento: '01/05/2005',
      email: 'teduardo144@hotmail.com',
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

  it('Should reject update User and return error description and name, because User cannot be underage', async () => {
    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.888-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo144@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const userUpdate = {
      nome: 'Talles ECB',
      cpf: '012.345.888-11',
      data_nascimento: '01/05/2005',
      email: 'teduardo144@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(user);

    const getIdUniquePeopleInBD = await request(app).get('/api/v1/people/');

    const response = await request(app)
      .put(`/api/v1/people/${getIdUniquePeopleInBD.body.usuarios[0]._id}`)
      .send(userUpdate);

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should reject update User and validating the requests return type, because User cannot be underage', async () => {
    const user = {
      nome: 'Talles ECB',
      cpf: '012.345.888-11',
      data_nascimento: '01/05/2000',
      email: 'teduardo144@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    const userUpdate = {
      nome: 'Talles ECB',
      cpf: '012.345.888-11',
      data_nascimento: '01/05/2005',
      email: 'teduardo144@hotmail.com',
      senha: 'talles123456',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(user);

    const getIdUniquePeopleInBD = await request(app).get('/api/v1/people/');

    const response = await request(app)
      .put(`/api/v1/people/${getIdUniquePeopleInBD.body.usuarios[0]._id}`)
      .send(userUpdate);

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });
});
