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
  it('Should reject Get by Query param and return status code 400, because must be greater than or equal to 1950', async () => {
    const car = {
      modelo: 'Fusca',
      cor: 'Cinza',
      ano: 1951,
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

    const response = await request(app).get(`/api/v1/car/?ano=1949`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('Should reject Get by Query param and return error description and error name, because must be greater than or equal to 1950', async () => {
    const car = {
      modelo: 'Fusca',
      cor: 'Cinza',
      ano: 1951,
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

    const response = await request(app).get(`/api/v1/car/?ano=1949`).set('Authorization', `Bearer ${token}`);

    expect(response.body[0]).toHaveProperty('description');
    expect(response.body[0]).toHaveProperty('name');
  });

  it('Should reject Get by Query param and validating the requests return type, because must be greater than or equal to 1950', async () => {
    const car = {
      modelo: 'Fusca',
      cor: 'Cinza',
      ano: 1951,
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

    const response = await request(app).get(`/api/v1/car/?ano=1949`).set('Authorization', `Bearer ${token}`);

    expect(response.body[0]).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should Get by Query param and return status code 200', async () => {
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

    const response = await request(app)
      .get('/api/v1/car/?descricao=Ar Condicionado')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('Should Get by Query param and verify that the content of the return is the same as the content sent in the car creation request', async () => {
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

    const response = await request(app)
      .get('/api/v1/car/?descricao=Ar Condicionado')
      .set('Authorization', `Bearer ${token}`);

    expect(response.body.veiculos[0]).toEqual({
      _id: response.body.veiculos[0]._id,
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

  it('Should Get by Query param and validating the requests return type', async () => {
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

    const response = await request(app)
      .get('/api/v1/car/?descricao=Ar Condicionado')
      .set('Authorization', `Bearer ${token}`);

    expect(response.body.veiculos[0]).toEqual({
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

  /*
  it('Should reject Get by Query param and return status code 400, because year must be greater or than 1950', async () => {
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

    const response = await request(app)
      .get(
        '/api/v1/car/?ano=2021'
      );

    expect(response.status).toBe(400);
  });

  it('Should reject Get by Query param and verify that the content of the return is the same as the content sent in the car creation request, because year must be greater or than 1950 ', async () => {
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

    await request(app).post('/api/v1/car/').send(car);

    const response = await request(app)
      .get(
        '/api/v1/car/?ano=2021'
      );

    expect(response.body).toHaveProperty('description')
    expect(response.body).toHaveProperty('string');
  });

  it('Should reject Get by Query param and validating the requests return type, because year must be greater or than 1950 ', async () => {
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

    await request(app).post('/api/v1/car/').send(car);

    const response = await request(app)
      .get(
        '/api/v1/car/?ano=2021'
      );

    expect(typeof response.body.description).toBe('string');
    expect(typeof response.body.name).toBe('string');
  });
  */
});
