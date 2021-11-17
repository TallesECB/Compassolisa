const request = require('supertest');
const app = require('../../../src/app');

describe('Rentals', () => {
  it('Should reject Get by Query param and return status code 400, because CNPJ invalid format in query', async () => {
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

    const response = await request(app).get(`/api/v1/rental/?cnpj=20.630.035.1001-51`);

    expect(response.status).toBe(400);
  });

  it('Should reject Get by Query param and return error description and error name, because CNPJ invalid format in query', async () => {
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

    const response = await request(app).get(`/api/v1/rental/?cnpj=20.630.035.1001-51`);

    expect(response.body[0]).toHaveProperty('description');
    expect(response.body[0]).toHaveProperty('name');
  });

  it('Should reject Get by Query param and validating the requests return type, because CNPJ invalid format in query', async () => {
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

    const response = await request(app).get(`/api/v1/rental/?cnpj=20.630.035.1001-51`);

    expect(response.body[0]).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should Get by Query param and return status code 200', async () => {
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

    const response = await request(app).get(`/api/v1/rental/?cep=96065-110`);

    expect(response.status).toBe(200);
  });

  it('Should Get by Query param and verify that the content of the return is the same as the content sent in the rental companys creation request', async () => {
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

    const response = await request(app).get(`/api/v1/rental/?cep=96065-110`);

    expect(response.body.rentals[0]).toEqual({
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

  it('Should Get by Query param and validating the requests return type', async () => {
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

    const response = await request(app).get(`/api/v1/rental/?cep=96065-110`);
    expect(response.body.rentals[0]).toEqual({
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
