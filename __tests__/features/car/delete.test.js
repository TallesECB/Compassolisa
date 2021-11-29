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

describe('Cars', () => {
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

    await request(app).post('/api/v1/car/').send(car).set('Authorization', `Bearer ${token}`);

    const getIdUniqueCarInBD = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);

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

    expect(response.body).toEqual({});
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

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });
});
