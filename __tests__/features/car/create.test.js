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

    expect(response.body).toEqual({
      _id: response.body._id,
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

    expect(response.body).toEqual([
      {
        description: expect.any(String),
        name: expect.any(String)
      },
      {
        description: expect.any(String),
        name: expect.any(String)
      }
    ]);
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

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });
});
