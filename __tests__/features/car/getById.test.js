const request = require('supertest');
const app = require('../../../src/app');

let token;

beforeAll(async () => {
  const userAuth = {
    nome: 'Talles ECB',
    cpf: '013.391.372-11',
    data_nascimento: '01/05/2000',
    email: 'teduardo1310@hotmail.com',
    senha: 'talles86526696',
    habilitado: 'sim'
  };

  await request(app).post('/api/v1/people/').send(userAuth);

  const response = await request(app)
    .post('/api/v1/authenticate/')
    .send({ email: userAuth.email, senha: userAuth.senha });

  token = response.body.token;
});

afterAll((done) => {
  done();
});

describe('Cars', () => {
  it('Should Car Get By Id and return status code 200', async () => {
    const car = {
      modelo: 'Fusca',
      cor: 'Cinza',
      ano: 2021,
      acessorios: [
        {
          descricao: 'Ar Condicionado'
        },
        {
          descricao: 'Bancos com Aquecedores'
        },
        {
          descricao: 'Teto Solar'
        }
      ],
      quantidadePassageiros: 5
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .get(`/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('Should Car get by id and validating if the return matches the cars data', async () => {
    const car = {
      modelo: 'Fusca',
      cor: 'Cinza',
      ano: 2021,
      acessorios: [
        {
          descricao: 'Ar Condicionado'
        },
        {
          descricao: 'Bancos com Aquecedores'
        },
        {
          descricao: 'Teto Solar'
        }
      ],
      quantidadePassageiros: 5
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .get(`/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toEqual({
      _id: getIdUniqueCarInBD.body.veiculos[0]._id,
      modelo: car.modelo,
      cor: car.cor,
      ano: car.ano,
      acessorios: [
        { _id: expect.any(String), descricao: car.acessorios[0].descricao },
        { _id: expect.any(String), descricao: car.acessorios[1].descricao },
        { _id: expect.any(String), descricao: car.acessorios[2].descricao }
      ],
      quantidadePassageiros: car.quantidadePassageiros
    });
  });

  it('Should Car get by id and validating the requests return type', async () => {
    const car = {
      modelo: 'Fusca',
      cor: 'Cinza',
      ano: 2021,
      acessorios: [
        {
          descricao: 'Ar Condicionado'
        },
        {
          descricao: 'Bancos com Aquecedores'
        },
        {
          descricao: 'Teto Solar'
        }
      ],
      quantidadePassageiros: 5
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .get(`/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toEqual({
      _id: expect.any(String),
      modelo: expect.any(String),
      cor: expect.any(String),
      ano: expect.any(Number),
      acessorios: [
        { _id: expect.any(String), descricao: expect.any(String) },
        { _id: expect.any(String), descricao: expect.any(String) },
        { _id: expect.any(String), descricao: expect.any(String) }
      ],
      quantidadePassageiros: expect.any(Number)
    });
  });

  it('Should reject Car Get By Id and return error code 404 because this id was not found', async () => {
    const carId = {
      _id: '618c713666d870fc740b8510'
    };

    const response = await request(app).get(`/api/v1/car/${carId._id}`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it('Should reject Car Get By Id and return error description and name because id was not found', async () => {
    const carId = {
      _id: '618c713666d870fc740b8510'
    };

    const response = await request(app).get(`/api/v1/car/${carId._id}`).set('Authorization', `Bearer ${token}`);

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should reject Car Get By Id and validating the requests return type error description and name because id was not found', async () => {
    const carId = {
      _id: '618c713666d870fc740b8510'
    };

    const response = await request(app).get(`/api/v1/car/${carId._id}`).set('Authorization', `Bearer ${token}`);

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should reject Car Get By Id and return error code 400 because this id have a invalid format', async () => {
    const carId = {
      _id: '618b166b363c64ea493b5e033'
    };

    const response = await request(app).get(`/api/v1/car/${carId._id}`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('Should reject Car Get By Id and return error description and name because this id have a invalid format', async () => {
    const carId = {
      _id: '618b166b363c64ea493b5e033'
    };

    const response = await request(app).get(`/api/v1/car/${carId._id}`).set('Authorization', `Bearer ${token}`);

    expect(response.body[0]).toHaveProperty('description');
    expect(response.body[0]).toHaveProperty('name');
  });

  it('Should reject Car Get By Id and validating the requests return type error description and name because this id have a invalid format', async () => {
    const carId = {
      _id: '618c713666d870fc740b8510'
    };

    const response = await request(app).get(`/api/v1/car/${carId._id}`).set('Authorization', `Bearer ${token}`);

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should reject Get by ID and return status code 401, because no token provided', async () => {
    const car = {
      modelo: 'Fusca',
      cor: 'Cinza',
      ano: 2021,
      acessorios: [
        {
          descricao: 'Ar Condicionado'
        },
        {
          descricao: 'Bancos com Aquecedores'
        },
        {
          descricao: 'Teto Solar'
        }
      ],
      quantidadePassageiros: 5
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .get(`/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}`)
      .set('Authorization', ``);

    expect(response.status).toBe(401);
  });

  it('Should reject Get by ID and return error description and error name, because no token provided', async () => {
    const car = {
      modelo: 'Fusca',
      cor: 'Cinza',
      ano: 2021,
      acessorios: [
        {
          descricao: 'Ar Condicionado'
        },
        {
          descricao: 'Bancos com Aquecedores'
        },
        {
          descricao: 'Teto Solar'
        }
      ],
      quantidadePassageiros: 5
    };

    const acessoryUpdate = {
      descricao: ''
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .patch(
        `/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}/acessorios/${getIdUniqueCarInBD.body.veiculos[0].acessorios[0]._id}`
      )
      .send(acessoryUpdate)
      .set('Authorization', ``);

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should reject Get by ID and validating the requests return type, because no token provided', async () => {
    const car = {
      modelo: 'Fusca',
      cor: 'Cinza',
      ano: 2021,
      acessorios: [
        {
          descricao: 'Ar Condicionado'
        },
        {
          descricao: 'Bancos com Aquecedores'
        },
        {
          descricao: 'Teto Solar'
        }
      ],
      quantidadePassageiros: 5
    };

    const acessoryUpdate = {
      descricao: ''
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .patch(
        `/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}/acessorios/${getIdUniqueCarInBD.body.veiculos[0].acessorios[0]._id}`
      )
      .send(acessoryUpdate)
      .set('Authorization', ``);

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should reject Get by ID and return status code 401, because Token Invalid Format', async () => {
    const car = {
      modelo: 'Fusca',
      cor: 'Cinza',
      ano: 2021,
      acessorios: [
        {
          descricao: 'Ar Condicionado'
        },
        {
          descricao: 'Bancos com Aquecedores'
        },
        {
          descricao: 'Teto Solar'
        }
      ],
      quantidadePassageiros: 5
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .get(`/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}`)
      .set('Authorization', `test ${token}`);

    expect(response.status).toBe(401);
  });

  it('Should reject Get by ID and return error description and error name, because Token Invalid Format', async () => {
    const car = {
      modelo: 'Fusca',
      cor: 'Cinza',
      ano: 2021,
      acessorios: [
        {
          descricao: 'Ar Condicionado'
        },
        {
          descricao: 'Bancos com Aquecedores'
        },
        {
          descricao: 'Teto Solar'
        }
      ],
      quantidadePassageiros: 5
    };

    const acessoryUpdate = {
      descricao: ''
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .patch(
        `/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}/acessorios/${getIdUniqueCarInBD.body.veiculos[0].acessorios[0]._id}`
      )
      .send(acessoryUpdate)
      .set('Authorization', `test ${token}`);

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should reject Get by ID and validating the requests return type, because Token Invalid Format', async () => {
    const car = {
      modelo: 'Fusca',
      cor: 'Cinza',
      ano: 2021,
      acessorios: [
        {
          descricao: 'Ar Condicionado'
        },
        {
          descricao: 'Bancos com Aquecedores'
        },
        {
          descricao: 'Teto Solar'
        }
      ],
      quantidadePassageiros: 5
    };

    const acessoryUpdate = {
      descricao: ''
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .patch(
        `/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}/acessorios/${getIdUniqueCarInBD.body.veiculos[0].acessorios[0]._id}`
      )
      .send(acessoryUpdate)
      .set('Authorization', `test ${token}`);

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should reject Get by ID and return status code 401, because Token Error - Bearer is required', async () => {
    const car = {
      modelo: 'Fusca',
      cor: 'Cinza',
      ano: 2021,
      acessorios: [
        {
          descricao: 'Ar Condicionado'
        },
        {
          descricao: 'Bancos com Aquecedores'
        },
        {
          descricao: 'Teto Solar'
        }
      ],
      quantidadePassageiros: 5
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .get(`/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}`)
      .set('Authorization', `${token}`);

    expect(response.status).toBe(401);
  });

  it('Should reject Get by ID and return error description and error name, because Token Error - Bearer is required', async () => {
    const car = {
      modelo: 'Fusca',
      cor: 'Cinza',
      ano: 2021,
      acessorios: [
        {
          descricao: 'Ar Condicionado'
        },
        {
          descricao: 'Bancos com Aquecedores'
        },
        {
          descricao: 'Teto Solar'
        }
      ],
      quantidadePassageiros: 5
    };

    const acessoryUpdate = {
      descricao: ''
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .patch(
        `/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}/acessorios/${getIdUniqueCarInBD.body.veiculos[0].acessorios[0]._id}`
      )
      .send(acessoryUpdate)
      .set('Authorization', `${token}`);

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should reject Get by ID and validating the requests return type, because Token Error - Bearer is required', async () => {
    const car = {
      modelo: 'Fusca',
      cor: 'Cinza',
      ano: 2021,
      acessorios: [
        {
          descricao: 'Ar Condicionado'
        },
        {
          descricao: 'Bancos com Aquecedores'
        },
        {
          descricao: 'Teto Solar'
        }
      ],
      quantidadePassageiros: 5
    };

    const acessoryUpdate = {
      descricao: ''
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .patch(
        `/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}/acessorios/${getIdUniqueCarInBD.body.veiculos[0].acessorios[0]._id}`
      )
      .send(acessoryUpdate)
      .set('Authorization', `${token}`);
    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should reject Get by ID and return status code 401, because Token invalid', async () => {
    const car = {
      modelo: 'Fusca',
      cor: 'Cinza',
      ano: 2021,
      acessorios: [
        {
          descricao: 'Ar Condicionado'
        },
        {
          descricao: 'Bancos com Aquecedores'
        },
        {
          descricao: 'Teto Solar'
        }
      ],
      quantidadePassageiros: 5
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const tokenInvalid =
      'ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlZHVhcmRvMTMxMEBob3RtYWlsLmNvbSIsImhhYmlsaXRhZG8iOiJzaW0iLCJpYXQiOjE2MzcwNzYzNDIsImV4cCI6MTYzNzE2Mjc0Mn0.OJ4crSB2qEs3WA6VXBRX9EJKDCLMGmCpV5YgqRc7BXM';

    const response = await request(app)
      .get(`/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}`)
      .set('Authorization', `Bearer ${tokenInvalid}`);

    expect(response.status).toBe(401);
  });

  it('Should reject Get by ID and return error description and error name, because Token invalid', async () => {
    const car = {
      modelo: 'Fusca',
      cor: 'Cinza',
      ano: 2021,
      acessorios: [
        {
          descricao: 'Ar Condicionado'
        },
        {
          descricao: 'Bancos com Aquecedores'
        },
        {
          descricao: 'Teto Solar'
        }
      ],
      quantidadePassageiros: 5
    };

    const acessoryUpdate = {
      descricao: ''
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const tokenInvalid =
      'ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlZHVhcmRvMTMxMEBob3RtYWlsLmNvbSIsImhhYmlsaXRhZG8iOiJzaW0iLCJpYXQiOjE2MzcwNzYzNDIsImV4cCI6MTYzNzE2Mjc0Mn0.OJ4crSB2qEs3WA6VXBRX9EJKDCLMGmCpV5YgqRc7BXM';

    const response = await request(app)
      .patch(
        `/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}/acessorios/${getIdUniqueCarInBD.body.veiculos[0].acessorios[0]._id}`
      )
      .send(acessoryUpdate)
      .set('Authorization', `Bearer ${tokenInvalid}`);

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should reject Get by ID and validating the requests return type, because Token invalid', async () => {
    const car = {
      modelo: 'Fusca',
      cor: 'Cinza',
      ano: 2021,
      acessorios: [
        {
          descricao: 'Ar Condicionado'
        },
        {
          descricao: 'Bancos com Aquecedores'
        },
        {
          descricao: 'Teto Solar'
        }
      ],
      quantidadePassageiros: 5
    };

    const acessoryUpdate = {
      descricao: ''
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const tokenInvalid =
      'ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlZHVhcmRvMTMxMEBob3RtYWlsLmNvbSIsImhhYmlsaXRhZG8iOiJzaW0iLCJpYXQiOjE2MzcwNzYzNDIsImV4cCI6MTYzNzE2Mjc0Mn0.OJ4crSB2qEs3WA6VXBRX9EJKDCLMGmCpV5YgqRc7BXM';

    const response = await request(app)
      .patch(
        `/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}/acessorios/${getIdUniqueCarInBD.body.veiculos[0].acessorios[0]._id}`
      )
      .send(acessoryUpdate)
      .set('Authorization', `Bearer ${tokenInvalid}`);

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });
});
