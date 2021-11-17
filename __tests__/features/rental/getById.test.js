const request = require('supertest');
const app = require('../../../src/app');

describe('Rentals', () => {
  it('Should reject get by ID for invalid format and return error code 400', async () => {
    const rental = {
      _id: '618b166b363c64ea493b5ec03'
    };

    const response = await request(app).get(`/api/v1/rental/${rental._id}`);

    expect(response.status).toBe(400);
  });

  it('Should reject get by ID for invalid format and return error description and error name', async () => {
    const rental = {
      _id: '618b166b363c64ea493b5ec03'
    };

    const response = await request(app).get(`/api/v1/rental/${rental._id}`);

    expect(response.body[0]).toHaveProperty('description');
    expect(response.body[0]).toHaveProperty('name');
  });

  it('Should reject get by ID for invalid format and verify request body return type', async () => {
    const rental = {
      _id: '618b166b363c64ea493b5ec03'
    };

    const response = await request(app).get(`/api/v1/rental/${rental._id}`);

    expect(response.body[0]).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should reject get by ID for Not Found and return error code 404', async () => {
    const rental = {
      _id: '618b166b363c64ea493b5ec0'
    };

    const response = await request(app).get(`/api/v1/rental/${rental._id}`);

    expect(response.status).toBe(404);
  });

  it('Should reject get by ID for Not Found and return error description and error name', async () => {
    const rental = {
      _id: '618b166b363c64ea493b5ec0'
    };

    const response = await request(app).get(`/api/v1/rental/${rental._id}`);

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should reject get by ID for Not Found and verify request body return type', async () => {
    const rental = {
      _id: '618b166b363c64ea493b5ec0'
    };

    const response = await request(app).get(`/api/v1/rental/${rental._id}`);

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should get by ID and return status code 200', async () => {
    const rental = {
      nome: 'Localiza Rent a Car',
      cnpj: '20.630.035/1001-51',
      atividades: 'Aluguel de Carros E Gestão de Frotas',
      endereco: [
        {
          cep: '96065-110',
          number: '4090',
          isFilial: false
        },
        {
          cep: '96065-760',
          number: '371',
          complemento: 'AP 12',
          isFilial: true
        },
        {
          cep: '96065-760',
          number: '371',
          complemento: 'AP 11',
          isFilial: true
        }
      ]
    };

    await request(app).post('/api/v1/rental/').send(rental);

    const getIdUniqueRentalInBD = await request(app).get('/api/v1/rental/');

    const response = await request(app).get(`/api/v1/rental/${getIdUniqueRentalInBD.body.rentals[0].id}`);

    expect(response.status).toBe(200);
  });

  it('Should get by ID and verify that the content of the return is the same as the rental company that was searched by id', async () => {
    const rental = {
      nome: 'Localiza Rent a Car',
      cnpj: '20.630.035/1001-51',
      atividades: 'Aluguel de Carros E Gestão de Frotas',
      endereco: [
        {
          cep: '96065-110',
          number: '4090',
          isFilial: false
        },
        {
          cep: '96065-760',
          number: '371',
          complemento: 'AP 12',
          isFilial: true
        },
        {
          cep: '96065-760',
          number: '371',
          complemento: 'AP 11',
          isFilial: true
        }
      ]
    };

    await request(app).post('/api/v1/rental/').send(rental);

    const getIdUniqueRentalInBD = await request(app).get('/api/v1/rental/');

    const response = await request(app).get(`/api/v1/rental/${getIdUniqueRentalInBD.body.rentals[0].id}`);

    expect(response.body).toEqual({
      id: expect.any(String),
      nome: rental.nome,
      cnpj: rental.cnpj,
      atividades: rental.atividades,
      endereco: [
        {
          cep: rental.endereco[0].cep,
          number: rental.endereco[0].number,
          bairro: expect.any(String),
          localidade: expect.any(String),
          logradouro: expect.any(String),
          uf: expect.any(String)
        },
        {
          cep: rental.endereco[1].cep,
          number: rental.endereco[1].number,
          complemento: rental.endereco[1].complemento,
          bairro: expect.any(String),
          localidade: expect.any(String),
          logradouro: expect.any(String),
          uf: expect.any(String)
        },
        {
          cep: rental.endereco[2].cep,
          number: rental.endereco[2].number,
          complemento: rental.endereco[2].complemento,
          bairro: expect.any(String),
          localidade: expect.any(String),
          logradouro: expect.any(String),
          uf: expect.any(String)
        }
      ]
    });
  });

  it('Should get by ID and validating the requests return type', async () => {
    const rental = {
      nome: 'Localiza Rent a Car',
      cnpj: '20.630.035/1001-51',
      atividades: 'Aluguel de Carros E Gestão de Frotas',
      endereco: [
        {
          cep: '96065-110',
          number: '4090',
          isFilial: false
        },
        {
          cep: '96065-760',
          number: '371',
          complemento: 'AP 12',
          isFilial: true
        },
        {
          cep: '96065-760',
          number: '371',
          complemento: 'AP 11',
          isFilial: true
        }
      ]
    };

    await request(app).post('/api/v1/rental/').send(rental);

    const getIdUniqueRentalInBD = await request(app).get('/api/v1/rental/');

    const response = await request(app).get(`/api/v1/rental/${getIdUniqueRentalInBD.body.rentals[0].id}`);

    expect(response.body).toEqual({
      id: expect.any(String),
      nome: expect.any(String),
      cnpj: expect.any(String),
      atividades: expect.any(String),
      endereco: [
        {
          cep: expect.any(String),
          number: expect.any(String),
          bairro: expect.any(String),
          localidade: expect.any(String),
          logradouro: expect.any(String),
          uf: expect.any(String)
        },
        {
          cep: expect.any(String),
          number: expect.any(String),
          complemento: expect.any(String),
          bairro: expect.any(String),
          localidade: expect.any(String),
          logradouro: expect.any(String),
          uf: expect.any(String)
        },
        {
          cep: expect.any(String),
          number: expect.any(String),
          complemento: expect.any(String),
          bairro: expect.any(String),
          localidade: expect.any(String),
          logradouro: expect.any(String),
          uf: expect.any(String)
        }
      ]
    });
  });
});
