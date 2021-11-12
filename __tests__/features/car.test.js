const request = require('supertest');
const app = require('../../src/app');
const Database = require('../../src/infra/database/mongo/index');
const CarSchema = require('../../src/app/schema/CarSchema');
const UserSchema = require('../../src/app/schema/UserSchema');

Database.connect();

let token;

beforeAll(async () => {
  await CarSchema.deleteMany();
  await UserSchema.deleteMany();

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

beforeEach(async () => {
  await CarSchema.deleteMany();
});

afterAll(async () => {
  await CarSchema.deleteMany();
  Database.disconnect();
});

describe('Cars', () => {
  it('Should create a new Car return status code 201', async () => {
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
    const response = await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${token}`).send(car);
    expect(response.status).toBe(201);
  });

  it('Should create a new Car and verify the return body with the request body', async () => {
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

    const response = await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${token}`).send(car);

    expect(response.body.modelo).toBe(car.modelo);
    expect(response.body.cor).toBe(car.cor);
    expect(response.body.ano).toBe(car.ano);
    expect(response.body.acessorios[0].descricao).toBe(car.acessorios[0].descricao);
    expect(response.body.acessorios[1].descricao).toBe(car.acessorios[1].descricao);
    expect(response.body.acessorios[2].descricao).toBe(car.acessorios[2].descricao);
    expect(response.body.quantidadePassageiros).toBe(car.quantidadePassageiros);
  });

  it('Should create a new Car and check the return if it contains the _id property', async () => {
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

    const response = await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${token}`).send(car);

    expect(response.body).toHaveProperty('_id');
  });

  it('Should create a new Car and check the requests return type', async () => {
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

    const response = await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${token}`).send(car);

    expect(typeof response.body.modelo).toBe('string');
    expect(typeof response.body.cor).toBe('string');
    expect(typeof response.body.ano).toBe('number');
    expect(typeof response.body.acessorios[0].descricao).toBe('string');
    expect(typeof response.body.acessorios[1].descricao).toBe('string');
    expect(typeof response.body.acessorios[2].descricao).toBe('string');
    expect(typeof response.body.quantidadePassageiros).toBe('number');
  });

  it('Should reject create a new Car and return error status code 400 because one or more requireds attributes are missing', async () => {
    const car = {
      modelo: 'Fusca',
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

    const response = await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${token}`).send(car);

    expect(response.status).toBe(400);
  });

  it('Should reject create a new Car and return error description and name because one or more requireds attributes are missing', async () => {
    const car = {
      modelo: 'Fusca',
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

    const response = await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${token}`).send(car);

    expect(response.body[0]).toHaveProperty('description');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[1]).toHaveProperty('description');
    expect(response.body[1]).toHaveProperty('name');
  });

  it('Should reject create a new Car and validating the requests return type, because one or more requireds attributes are missing', async () => {
    const car = {
      modelo: 'Fusca',
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

    const response = await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${token}`).send(car);

    expect(typeof response.body[0].description).toBe('string');
    expect(typeof response.body[0].name).toBe('string');
    expect(typeof response.body[1].description).toBe('string');
    expect(typeof response.body[1].name).toBe('string');
  });

  it('Should reject create a new Car and return error status code 400, because It is necessary to have at least one Accessory', async () => {
    const car = {
      modelo: 'Fusca',
      cor: 'Cinza',
      ano: 2021,
      acessorios: [],
      quantidadePassageiros: 5
    };

    const response = await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${token}`).send(car);

    expect(response.status).toBe(400);
  });

  it('Should reject create a new Car and return error description and name, because It is necessary to have at least one Accessory', async () => {
    const car = {
      modelo: 'Fusca',
      cor: 'Cinza',
      ano: 2021,
      acessorios: [],
      quantidadePassageiros: 5
    };

    const response = await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${token}`).send(car);

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should reject create a new Car and validating the requests return type, because It is necessary to have at least one Accessory', async () => {
    const car = {
      modelo: 'Fusca',
      cor: 'Cinza',
      ano: 2021,
      acessorios: [],
      quantidadePassageiros: 5
    };

    const response = await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${token}`).send(car);

    expect(typeof response.body.description).toBe('string');
    expect(typeof response.body.name).toBe('string');
  });

  it('Should delete Car and return status code 204', async () => {
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

    await request(app)
      .post('/api/v1/car/')
      .set('Authorization', `Bearer ${token}`)
      .send(car)
      .set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app)
      .get('/api/v1/car/')
      .set('Authorization', `Bearer ${token}`)
      .set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .delete(`/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it('Should delete Car and return empty body', async () => {
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
      .delete(`/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body.modelo).toBeUndefined();
    expect(response.body.cor).toBeUndefined();
    expect(response.body.acessorios).toBeUndefined();
    expect(response.body.quantidadePassageiros).toBeUndefined();
  });

  it('Should reject Car delete and return error code 400 because this id was not found or it has already been deleted', async () => {
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

    await request(app)
      .delete(`/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}`)
      .set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .delete(`/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it('Should reject car delete and return error description and name because this id was not found or it has already been deleted', async () => {
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

    await request(app)
      .delete(`/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}`)
      .set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .delete(`/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should reject car delete and validating the requests return type, because this id was not found or it has already been deleted', async () => {
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

    await request(app)
      .delete(`/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}`)
      .set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .delete(`/api/v1/car/${getIdUniqueCarInBD.body.veiculos[0]._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(typeof response.body.description).toBe('string');
    expect(typeof response.body.name).toBe('string');
  });

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

    expect(response.body.modelo).toBe(car.modelo);
    expect(response.body.cor).toBe(car.cor);
    expect(response.body.ano).toBe(car.ano);
    expect(response.body.acessorios[0].descricao).toBe(car.acessorios[0].descricao);
    expect(response.body.acessorios[1].descricao).toBe(car.acessorios[1].descricao);
    expect(response.body.acessorios[2].descricao).toBe(car.acessorios[2].descricao);
    expect(response.body.quantidadePassageiros).toBe(car.quantidadePassageiros);
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

    expect(typeof response.body.modelo).toBe('string');
    expect(typeof response.body.cor).toBe('string');
    expect(typeof response.body.ano).toBe('number');
    expect(typeof response.body.acessorios[0]).toBe('object');
    expect(typeof response.body.acessorios[1]).toBe('object');
    expect(typeof response.body.acessorios[2]).toBe('object');
    expect(typeof response.body.quantidadePassageiros).toBe('number');
  });

  it('Should car get by id and and check if it returns the _id attribute of the car', async () => {
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

    expect(response.body).toHaveProperty('_id');
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

    expect(typeof response.body.description).toBe('string');
    expect(typeof response.body.name).toBe('string');
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

    expect(typeof response.body.description).toBe('string');
    expect(typeof response.body.name).toBe('string');
  });

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

    const getIdUniqueCarlInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .put(`/api/v1/car/${getIdUniqueCarlInBD.body.veiculos[0]._id}`)
      .send(carUpdate)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body.modelo).toBe(carUpdate.modelo);
    expect(response.body.cor).toBe(carUpdate.cor);
    expect(response.body.ano).toBe(carUpdate.ano);
    expect(response.body.acessorios[0].descricao).toBe(carUpdate.acessorios[0].descricao);
    expect(response.body.acessorios[1].descricao).toBe(carUpdate.acessorios[1].descricao);
    expect(response.body.quantidadePassageiros).toBe(carUpdate.quantidadePassageiros);
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

    expect(typeof response.body.modelo).toBe('string');
    expect(typeof response.body.cor).toBe('string');
    expect(typeof response.body.ano).toBe('number');
    expect(typeof response.body.acessorios[0].descricao).toBe('string');
    expect(typeof response.body.acessorios[1].descricao).toBe('string');
    expect(typeof response.body.quantidadePassageiros).toBe('number');
  });

  it('Should Update Car by id and and check if it returns the _id attribute of the car', async () => {
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

    expect(response.body).toHaveProperty('_id');
  });

  it('Should reject User Update By Id and return error code 404 because this id was not found', async () => {
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

  it('Should reject User Update By Id and return error description and name because id was not found', async () => {
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

  it('Should reject User Update By Id and validating the requests return type, because id was not found', async () => {
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
    expect(typeof response.body.description).toBe('string');
    expect(typeof response.body.name).toBe('string');
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

    expect(typeof response.body[0].description).toBe('string');
    expect(typeof response.body[0].name).toBe('string');
  });

  it('Should reject update a Acessory - Car by ID and return status code 200', async () => {
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

    expect(response.body._id).toBe(getIdUniqueCarInBD.body.veiculos[0]._id);
    expect(response.body.modelo).toBe(car.modelo);
    expect(response.body.cor).toBe(car.cor);
    expect(response.body.ano).toBe(car.ano);
    expect(response.body.acessorios[0].descricao).toBe(acessoryUpdate.descricao);
    expect(response.body.acessorios[0]._id).toBe(getIdUniqueCarInBD.body.veiculos[0].acessorios[0]._id);
    expect(response.body.acessorios[1].descricao).toBe(car.acessorios[1].descricao);
    expect(response.body.acessorios[2].descricao).toBe(car.acessorios[2].descricao);
    expect(response.body.quantidadePassageiros).toBe(car.quantidadePassageiros);
  });
});
