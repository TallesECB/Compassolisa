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

afterAll(done => {
  done();
})

describe('Cars', () => {
  it('Should Update a Car by ID and return status code 200', async () => {
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

    const carUpdate = {
      modelo: 'Fusca',
      cor: 'Branco',
      ano: 2021,
      acessorios: [
        {
          descricao: 'Ar Condicionado'
        },
        {
          descricao: 'Bancos com Aquecedores'
        }
      ],
      quantidadePassageiros: 5
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarlInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .put(`/api/v1/car/${getIdUniqueCarlInBD.body.veiculos[0]._id}`)
      .send(carUpdate)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('Should Update a Car by ID and validating if the return matches the cars data', async () => {
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

    const carUpdate = {
      modelo: 'Fusca',
      cor: 'Branco',
      ano: 2021,
      acessorios: [
        {
          descricao: 'Ar Condicionado'
        },
        {
          descricao: 'Bancos com Aquecedores'
        }
      ],
      quantidadePassageiros: 5
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .put(`/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}`)
      .send(carUpdate)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toEqual({
      _id: getIdUniqueCarInBD.body.veiculos[0]._id,
      modelo: carUpdate.modelo,
      cor: carUpdate.cor,
      ano: carUpdate.ano,
      acessorios: [
        { _id: expect.any(String), descricao: carUpdate.acessorios[0].descricao },
        { _id: expect.any(String), descricao: carUpdate.acessorios[1].descricao }
      ],
      quantidadePassageiros: carUpdate.quantidadePassageiros
    });
  });

  it('Should Update a Car by ID and validating the requests return type', async () => {
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

    const carUpdate = {
      modelo: 'Fusca',
      cor: 'Branco',
      ano: 2021,
      acessorios: [
        {
          descricao: 'Ar Condicionado'
        },
        {
          descricao: 'Bancos com Aquecedores'
        }
      ],
      quantidadePassageiros: 5
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarlInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .put(`/api/v1/car/${getIdUniqueCarlInBD.body.veiculos[0]._id}`)
      .send(carUpdate)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toEqual({
      _id: expect.any(String),
      modelo: expect.any(String),
      cor: expect.any(String),
      ano: expect.any(Number),
      acessorios: [
        { _id: expect.any(String), descricao: expect.any(String) },
        { _id: expect.any(String), descricao: expect.any(String) }
      ],
      quantidadePassageiros: expect.any(Number)
    });
  });

  it('Should reject Car Update By Id and return error code 404 because this id was not found', async () => {
    const carId = {
      _id: '618c713666d870fc740b8510'
    };

    const carUpdate = {
      modelo: 'Fusca',
      cor: 'Branco',
      ano: 2021,
      acessorios: [
        {
          descricao: 'Ar Condicionado'
        },
        {
          descricao: 'Bancos com Aquecedores'
        }
      ],
      quantidadePassageiros: 5
    };

    const response = await request(app)
      .put(`/api/v1/car/${carId._id}`)
      .send(carUpdate)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it('Should reject Car Update By Id and return error description and name because id was not found', async () => {
    const carId = {
      _id: '618c713666d870fc740b8510'
    };

    const carUpdate = {
      modelo: 'Fusca',
      cor: 'Branco',
      ano: 2021,
      acessorios: [
        {
          descricao: 'Ar Condicionado'
        },
        {
          descricao: 'Bancos com Aquecedores'
        }
      ],
      quantidadePassageiros: 5
    };

    const response = await request(app)
      .put(`/api/v1/car/${carId._id}`)
      .send(carUpdate)
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should reject Car Update By Id and validating the requests return type, because id was not found', async () => {
    const carId = {
      _id: '618c713666d870fc740b8510'
    };

    const carUpdate = {
      modelo: 'Fusca',
      cor: 'Branco',
      ano: 2021,
      acessorios: [
        {
          descricao: 'Ar Condicionado'
        },
        {
          descricao: 'Bancos com Aquecedores'
        }
      ],
      quantidadePassageiros: 5
    };

    const response = await request(app)
      .put(`/api/v1/car/${carId._id}`)
      .send(carUpdate)
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should reject update a Car by ID and return error code 400 because one or more requireds attributes are missing', async () => {
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
    const carUpdate = {
      cor: 'Branco',
      ano: 2021,
      acessorios: [
        {
          descricao: 'Ar Condicionado'
        },
        {
          descricao: 'Bancos com Aquecedores'
        }
      ],
      quantidadePassageiros: 5
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .put(`/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}`)
      .send(carUpdate)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('Should reject update a Car by ID and return error description and name because one or more requireds attributes are missing', async () => {
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
    const carUpdate = {
      cor: 'Branco',
      ano: 2021,
      acessorios: [
        {
          descricao: 'Ar Condicionado'
        },
        {
          descricao: 'Bancos com Aquecedores'
        }
      ],
      quantidadePassageiros: 5
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .put(`/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}`)
      .send(carUpdate)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body[0]).toHaveProperty('description');
    expect(response.body[0]).toHaveProperty('name');
  });

  it('Should reject update a Car by ID and validating the requests return type, because one or more requireds attributes are missing', async () => {
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
    const carUpdate = {
      cor: 'Branco',
      ano: 2021,
      acessorios: [
        {
          descricao: 'Ar Condicionado'
        },
        {
          descricao: 'Bancos com Aquecedores'
        }
      ],
      quantidadePassageiros: 5
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .put(`/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}`)
      .send(carUpdate)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body[0]).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should update a Acessory - Car by ID and return status code 200', async () => {
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
      descricao: 'Ar Condicionado Quente'
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .patch(
        `/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}/acessorios/${getIdUniqueCarInBD.body.veiculos[0].acessorios[0]._id}`
      )
      .send(acessoryUpdate)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('Should update a Acessory - Car by ID and validating if the return matches the cars data', async () => {
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
      descricao: 'Ar Condicionado Quente'
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .patch(
        `/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}/acessorios/${getIdUniqueCarInBD.body.veiculos[0].acessorios[0]._id}`
      )
      .send(acessoryUpdate)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toEqual({
      _id: getIdUniqueCarInBD.body.veiculos[0]._id,
      modelo: car.modelo,
      cor: car.cor,
      ano: car.ano,
      acessorios: [
        { _id: expect.any(String), descricao: acessoryUpdate.descricao },
        { _id: expect.any(String), descricao: car.acessorios[1].descricao },
        { _id: expect.any(String), descricao: car.acessorios[2].descricao }
      ],
      quantidadePassageiros: car.quantidadePassageiros
    });
  });

  it('Should update a Acessory - Car by ID and validating the requests return type', async () => {
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
      descricao: 'Ar Condicionado Quente'
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .patch(
        `/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}/acessorios/${getIdUniqueCarInBD.body.veiculos[0].acessorios[0]._id}`
      )
      .send(acessoryUpdate)
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

  it('Should reject update a Acessory - Car by ID and return status code 400, because description cannot be empty', async () => {
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
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('Should reject update a Acessory - Car by ID and return error description and error name, because description cannot be empty', async () => {
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
      .set('Authorization', `Bearer ${token}`);

    expect(response.body[0]).toHaveProperty('description');
    expect(response.body[0]).toHaveProperty('name');
  });

  it('Should reject update a Acessory - Car by ID and validating the requests return type, because description cannot be empty', async () => {
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
      .set('Authorization', `Bearer ${token}`);

    expect(response.body[0]).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should reject update a Acessory - Car by ID and return status code 400, because Car ID is invalid', async () => {
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

    const carId = {
      _id: '6193fa01a0e136fc49fd5e43'
    };

    const acessoryUpdate = {
      descricao: 'Teto Solar'
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .patch(`/api/v1/car/${carId._id}/acessorios/${getIdUniqueCarInBD.body.veiculos[0].acessorios[0]._id}`)
      .send(acessoryUpdate)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it('Should reject update a Acessory - Car by ID and return error description and error name, because Car ID is invalid', async () => {
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

    const carId = {
      _id: '6193fa01a0e136fc49fd5e43'
    };

    const acessoryUpdate = {
      descricao: 'Teto Solar'
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .patch(`/api/v1/car/${carId._id}/acessorios/${getIdUniqueCarInBD.body.veiculos[0].acessorios[0]._id}`)
      .send(acessoryUpdate)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should reject update a Acessory - Car by ID and validating the requests return type, because Car ID is invalid', async () => {
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

    const carId = {
      _id: '6193fa01a0e136fc49fd5e43'
    };

    const acessoryUpdate = {
      descricao: 'Teto Solar'
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .patch(`/api/v1/car/${carId._id}/acessorios/${getIdUniqueCarInBD.body.veiculos[0].acessorios[0]._id}`)
      .send(acessoryUpdate)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should reject update a Acessory - Car by ID and return status code 400, because Acessory ID is invalid', async () => {
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

    const acessoryId = {
      _id: '6193fa01a0e136fc49fd5e43'
    };

    const acessoryUpdate = {
      descricao: 'Teto Solar'
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .patch(`/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}/acessorios/${acessoryId._id}`)
      .send(acessoryUpdate)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it('Should reject update a Acessory - Car by ID and return error description and error name, because Acessory ID is invalid', async () => {
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

    const acessoryId = {
      _id: '6193fa01a0e136fc49fd5e43'
    };

    const acessoryUpdate = {
      descricao: 'Teto Solar'
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .patch(`/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}/acessorios/${acessoryId._id}`)
      .send(acessoryUpdate)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should reject update a Acessory - Car by ID and validating the requests return type, because Acessory ID is invalid', async () => {
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

    const acessoryId = {
      _id: '6193fa01a0e136fc49fd5e43'
    };

    const acessoryUpdate = {
      descricao: 'Teto Solar'
    };

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .patch(`/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}/acessorios/${acessoryId._id}`)
      .send(acessoryUpdate)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });
});
