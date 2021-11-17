const request = require('supertest');
const app = require('../../../src/app');

describe('Rentals', () => {
  it('Should remove the Rental Company by your ID and return status code 204', async () => {
    const rental = {
      nome: 'Rent a Car',
      cnpj: '20.630.035/1001-51',
      atividades: 'Aluguel de Carros',
      endereco: [
        {
          cep: '96065-110',
          number: '4090',
          complemento: 'AP 11',
          isFilial: false
        }
      ]
    };

    await request(app).post('/api/v1/rental/').send(rental);

    const getUniqueRentalInBD = await request(app).get('/api/v1/rental/');

    const response = await request(app).delete(`/api/v1/rental/${getUniqueRentalInBD.body.rentals[0].id}`);

    expect(response.status).toBe(204);
  });

  it('Should remove the Rental Company by your ID and return empty body', async () => {
    const rental = {
      nome: 'Rent a Car',
      cnpj: '20.630.035/1001-51',
      atividades: 'Aluguel de Carros',
      endereco: [
        {
          cep: '96065-110',
          number: '4090',
          complemento: 'AP 11',
          isFilial: false
        }
      ]
    };

    await request(app).post('/api/v1/rental/').send(rental);

    const getUniqueRentalInBD = await request(app).get('/api/v1/rental/');

    const response = await request(app).delete(`/api/v1/rental/${getUniqueRentalInBD.body.rentals[0].id}`);

    expect(response.body).toEqual({});
  });

  it('Dont remove a Rental Company and return error code 404, for an ID that has already been deleted or because the ID was not found', async () => {
    const rental = {
      nome: 'Rent a Car',
      cnpj: '20.630.035/1001-51',
      atividades: 'Aluguel de Carros',
      endereco: [
        {
          cep: '96065-110',
          number: '4090',
          complemento: 'AP 11',
          isFilial: false
        }
      ]
    };

    await request(app).post('/api/v1/rental/').send(rental);

    const getUniqueRentalInBD = await request(app).get('/api/v1/rental/');

    await request(app).delete(`/api/v1/rental/${getUniqueRentalInBD.body.rentals[0].id}`);

    const response = await request(app).delete(`/api/v1/rental/${getUniqueRentalInBD.body.rentals[0].id}`);

    expect(response.status).toBe(404);
  });

  it('Dont remove a Rental Company and return error description and error name, for an ID that has already been deleted or because the ID was not found', async () => {
    const rental = {
      nome: 'Rent a Car',
      cnpj: '20.630.035/1001-51',
      atividades: 'Aluguel de Carros',
      endereco: [
        {
          cep: '96065-110',
          number: '4090',
          complemento: 'AP 11',
          isFilial: false
        }
      ]
    };

    await request(app).post('/api/v1/rental/').send(rental);

    const getUniqueRentalInBD = await request(app).get('/api/v1/rental/');

    await request(app).delete(`/api/v1/rental/${getUniqueRentalInBD.body.rentals[0].id}`);

    const response = await request(app).delete(`/api/v1/rental/${getUniqueRentalInBD.body.rentals[0].id}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Dont remove a Rental Company and verify request body return type, for an ID that has already been deleted or because the ID was not found', async () => {
    const rental = {
      nome: 'Rent a Car',
      cnpj: '20.630.035/1001-51',
      atividades: 'Aluguel de Carros',
      endereco: [
        {
          cep: '96065-110',
          number: '4090',
          complemento: 'AP 11',
          isFilial: false
        }
      ]
    };

    await request(app).post('/api/v1/rental/').send(rental);

    const getUniqueRentalInBD = await request(app).get('/api/v1/rental/');

    await request(app).delete(`/api/v1/rental/${getUniqueRentalInBD.body.rentals[0].id}`);

    const response = await request(app).delete(`/api/v1/rental/${getUniqueRentalInBD.body.rentals[0].id}`);

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });
});
