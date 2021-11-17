const request = require('supertest');
const app = require('../../../src/app');

describe('Rentals', () => {
  it('Should reject update a rental company because CNPJ is unique and return erro code 409', async () => {
    const rentalMock = {
      nome: 'Rent a Car',
      cnpj: '20.630.035/8888-51',
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

    const rental = {
      nome: 'Rent a Car',
      cnpj: '20.630.035/9999-51',
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

    const rentalUpdate = {
      nome: 'Rent a Car',
      cnpj: '20.630.035/8888-51',
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
    await request(app).post('/api/v1/rental/').send(rentalMock);

    const getIdPrimaryRentalInBD = await request(app).get('/api/v1/rental/');

    const response = await request(app)
      .put(`/api/v1/rental/${getIdPrimaryRentalInBD.body.rentals[0].id}`)
      .send(rentalUpdate);

    expect(response.status).toBe(409);
  });

  it('Should reject update a rental company because CNPJ is unique and returns an error description and error name', async () => {
    const rentalMock = {
      nome: 'Rent a Car',
      cnpj: '20.630.035/8888-51',
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

    const rental = {
      nome: 'Rent a Car',
      cnpj: '20.630.035/9999-51',
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

    const rentalUpdate = {
      nome: 'Rent a Car',
      cnpj: '20.630.035/8888-51',
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
    await request(app).post('/api/v1/rental/').send(rentalMock);

    const getIdPrimaryRentalInBD = await request(app).get('/api/v1/rental/');

    const response = await request(app)
      .put(`/api/v1/rental/${getIdPrimaryRentalInBD.body.rentals[0].id}`)
      .send(rentalUpdate);

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should reject update a rental company because CNPJ is unique and verify request body return type', async () => {
    const rentalMock = {
      nome: 'Rent a Car',
      cnpj: '20.630.035/8888-51',
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

    const rental = {
      nome: 'Rent a Car',
      cnpj: '20.630.035/9999-51',
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

    const rentalUpdate = {
      nome: 'Rent a Car',
      cnpj: '20.630.035/8888-51',
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
    await request(app).post('/api/v1/rental/').send(rentalMock);

    const getIdPrimaryRentalInBD = await request(app).get('/api/v1/rental/');

    const response = await request(app)
      .put(`/api/v1/rental/${getIdPrimaryRentalInBD.body.rentals[0].id}`)
      .send(rentalUpdate);

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should update a rental company by ID and return status code 200', async () => {
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

    const rentalUpdate = {
      nome: 'Localiza Rent a Car',
      cnpj: '20.630.035/1001-51',
      atividades: 'Aluguel de Carros E Gestão de Frotas e limpeza dos veiculos',
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

    const response = await request(app)
      .put(`/api/v1/rental/${getIdUniqueRentalInBD.body.rentals[0].id}`)
      .send(rentalUpdate);

    expect(response.status).toBe(200);
  });

  it('Should update a rental company by ID and validating if the return matches the rentals data', async () => {
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

    const rentalUpdate = {
      nome: 'Localiza Rent a Car',
      cnpj: '20.630.035/1001-51',
      atividades: 'Aluguel de Carros E Gestão de Frotas e limpeza dos veiculos',
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

    const response = await request(app)
      .put(`/api/v1/rental/${getIdUniqueRentalInBD.body.rentals[0].id}`)
      .send(rentalUpdate);

    expect(response.body).toEqual({
      id: expect.any(String),
      nome: rentalUpdate.nome,
      cnpj: rentalUpdate.cnpj,
      atividades: rentalUpdate.atividades,
      endereco: [
        {
          cep: rentalUpdate.endereco[0].cep,
          number: rentalUpdate.endereco[0].number,
          bairro: expect.any(String),
          localidade: expect.any(String),
          logradouro: expect.any(String),
          uf: expect.any(String)
        },
        {
          cep: rentalUpdate.endereco[1].cep,
          number: rentalUpdate.endereco[1].number,
          complemento: rentalUpdate.endereco[1].complemento,
          bairro: expect.any(String),
          localidade: expect.any(String),
          logradouro: expect.any(String),
          uf: expect.any(String)
        },
        {
          cep: rentalUpdate.endereco[2].cep,
          number: rentalUpdate.endereco[2].number,
          complemento: rentalUpdate.endereco[2].complemento,
          bairro: expect.any(String),
          localidade: expect.any(String),
          logradouro: expect.any(String),
          uf: expect.any(String)
        }
      ]
    });
  });

  it('Should update a rental company by ID and validating the requests return type', async () => {
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

    const rentalUpdate = {
      nome: 'Localiza Rent a Car',
      cnpj: '20.630.035/1001-51',
      atividades: 'Aluguel de Carros E Gestão de Frotas e limpeza dos veiculos',
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

    const response = await request(app)
      .put(`/api/v1/rental/${getIdUniqueRentalInBD.body.rentals[0].id}`)
      .send(rentalUpdate);

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

  it('Should reject update a rental company by ID and return status 404, because ID Not Found', async () => {
    const rental = {
      _id: '618b166b363c64ea493b5e03'
    };

    const rentalUpdate = {
      nome: 'Localiza Rent a Car',
      cnpj: '20.630.035/1001-51',
      atividades: 'Aluguel de Carros E Gestão de Frotas e limpeza dos veiculos',
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

    const response = await request(app).put(`/api/v1/rental/${rental._id}`).send(rentalUpdate);

    expect(response.status).toBe(404);
  });

  it('Should reject update a rental company by ID and return error description and error name, because ID Not Found', async () => {
    const rental = {
      _id: '618b166b363c64ea493b5e03'
    };

    const rentalUpdate = {
      nome: 'Localiza Rent a Car',
      cnpj: '20.630.035/1001-51',
      atividades: 'Aluguel de Carros E Gestão de Frotas e limpeza dos veiculos',
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

    const response = await request(app).put(`/api/v1/rental/${rental._id}`).send(rentalUpdate);

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should reject update a rental company by ID and validating the requests return type, because ID Not Found', async () => {
    const rental = {
      _id: '618b166b363c64ea493b5e03'
    };

    const rentalUpdate = {
      nome: 'Localiza Rent a Car',
      cnpj: '20.630.035/1001-51',
      atividades: 'Aluguel de Carros E Gestão de Frotas e limpeza dos veiculos',
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

    const response = await request(app).put(`/api/v1/rental/${rental._id}`).send(rentalUpdate);

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should reject update a rental company by ID and return error code 400, because ID Invalid Format', async () => {
    const rental = {
      _id: '618b166b363c64ea493b53e03'
    };

    const rentalUpdate = {
      nome: 'Localiza Rent a Car',
      cnpj: '20.630.035/1001-51',
      atividades: 'Aluguel de Carros E Gestão de Frotas e limpeza dos veiculos',
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

    const response = await request(app).put(`/api/v1/rental/${rental._id}`).send(rentalUpdate);

    expect(response.status).toBe(400);
  });

  it('Should reject update a rental company by ID and return error description and error name, because ID Invalid Format', async () => {
    const rental = {
      _id: '618b166b363c64ea493b53e03'
    };

    const rentalUpdate = {
      nome: 'Localiza Rent a Car',
      cnpj: '20.630.035/1001-51',
      atividades: 'Aluguel de Carros E Gestão de Frotas e limpeza dos veiculos',
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

    const response = await request(app).put(`/api/v1/rental/${rental._id}`).send(rentalUpdate);

    expect(response.body[0]).toHaveProperty('description');
    expect(response.body[0]).toHaveProperty('name');
  });

  it('Should reject update a rental company by ID and validating the requests return type, because ID Invalid Format', async () => {
    const rental = {
      _id: '618b166b363c64ea493b53e03'
    };

    const rentalUpdate = {
      nome: 'Localiza Rent a Car',
      cnpj: '20.630.035/1001-51',
      atividades: 'Aluguel de Carros E Gestão de Frotas e limpeza dos veiculos',
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

    const response = await request(app).put(`/api/v1/rental/${rental._id}`).send(rentalUpdate);

    expect(response.body[0]).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should reject update a rental company by ID and return error code 400, because one or more requireds attributes are missing', async () => {
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

    const rentalUpdate = {
      nome: 'Localiza Rent a Car',
      atividades: 'Aluguel de Carros E Gestão de Frotas e limpeza dos veiculos',
      endereco: [
        {
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

    const response = await request(app)
      .put(`/api/v1/rental/${getIdUniqueRentalInBD.body.rentals[0].id}`)
      .send(rentalUpdate);

    expect(response.status).toBe(400);
  });

  it('Should reject update a rental company by ID and return error description and error name, because one or more requireds attributes are missing', async () => {
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

    const rentalUpdate = {
      nome: 'Localiza Rent a Car',
      atividades: 'Aluguel de Carros E Gestão de Frotas e limpeza dos veiculos',
      endereco: [
        {
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

    const response = await request(app)
      .put(`/api/v1/rental/${getIdUniqueRentalInBD.body.rentals[0].id}`)
      .send(rentalUpdate);

    expect(response.body[0]).toHaveProperty('description');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[1]).toHaveProperty('description');
    expect(response.body[1]).toHaveProperty('name');
  });

  it('Should reject update a rental company by ID and and validating the requests return type, because one or more requireds attributes are missing', async () => {
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

    const rentalUpdate = {
      nome: 'Localiza Rent a Car',
      atividades: 'Aluguel de Carros E Gestão de Frotas e limpeza dos veiculos',
      endereco: [
        {
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

    const response = await request(app)
      .put(`/api/v1/rental/${getIdUniqueRentalInBD.body.rentals[0].id}`)
      .send(rentalUpdate);

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

  it('Should reject update a rental company by ID and return error code 400, because CEP Invalid', async () => {
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

    const rentalUpdate = {
      nome: 'Localiza Rent a Car',
      cnpj: '20.630.035/1001-51',
      atividades: 'Aluguel de Carros E Gestão de Frotas e limpeza dos veiculos',
      endereco: [
        {
          cep: '98333-032',
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

    const response = await request(app)
      .put(`/api/v1/rental/${getIdUniqueRentalInBD.body.rentals[0].id}`)
      .send(rentalUpdate);

    expect(response.status).toBe(400);
  });

  it('Should reject update a rental company by ID and return error description and error name, because CEP Invalid', async () => {
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

    const rentalUpdate = {
      nome: 'Localiza Rent a Car',
      cnpj: '20.630.035/1001-51',
      atividades: 'Aluguel de Carros E Gestão de Frotas e limpeza dos veiculos',
      endereco: [
        {
          cep: '98333-032',
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

    const response = await request(app)
      .put(`/api/v1/rental/${getIdUniqueRentalInBD.body.rentals[0].id}`)
      .send(rentalUpdate);

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should reject update a rental company by ID and and validating the requests return type, because CEP Invalid', async () => {
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

    const rentalUpdate = {
      nome: 'Localiza Rent a Car',
      cnpj: '20.630.035/1001-51',
      atividades: 'Aluguel de Carros E Gestão de Frotas e limpeza dos veiculos',
      endereco: [
        {
          cep: '98333-032',
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

    const response = await request(app)
      .put(`/api/v1/rental/${getIdUniqueRentalInBD.body.rentals[0].id}`)
      .send(rentalUpdate);

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should reject update a rental company by ID and return error code 409, because Main Office is Unique', async () => {
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

    const rentalUpdate = {
      nome: 'Localiza Rent a Car',
      cnpj: '20.630.035/1001-51',
      atividades: 'Aluguel de Carros E Gestão de Frotas e limpeza dos veiculos',
      endereco: [
        {
          cep: '96065-760',
          number: '4090',
          isFilial: false
        },
        {
          cep: '96065-760',
          number: '371',
          complemento: 'AP 12',
          isFilial: false
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

    const response = await request(app)
      .put(`/api/v1/rental/${getIdUniqueRentalInBD.body.rentals[0].id}`)
      .send(rentalUpdate);

    expect(response.status).toBe(409);
  });

  it('Should reject update a rental company by ID and return error description and error name, because Main Office is Unique', async () => {
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

    const rentalUpdate = {
      nome: 'Localiza Rent a Car',
      cnpj: '20.630.035/1001-51',
      atividades: 'Aluguel de Carros E Gestão de Frotas e limpeza dos veiculos',
      endereco: [
        {
          cep: '96065-760',
          number: '4090',
          isFilial: false
        },
        {
          cep: '96065-760',
          number: '371',
          complemento: 'AP 12',
          isFilial: false
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

    const response = await request(app)
      .put(`/api/v1/rental/${getIdUniqueRentalInBD.body.rentals[0].id}`)
      .send(rentalUpdate);

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should reject update a rental company by ID and and validating the requests return type, because Main Office is Unique', async () => {
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

    const rentalUpdate = {
      nome: 'Localiza Rent a Car',
      cnpj: '20.630.035/1001-51',
      atividades: 'Aluguel de Carros E Gestão de Frotas e limpeza dos veiculos',
      endereco: [
        {
          cep: '96065-760',
          number: '4090',
          isFilial: false
        },
        {
          cep: '96065-760',
          number: '371',
          complemento: 'AP 12',
          isFilial: false
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

    const response = await request(app)
      .put(`/api/v1/rental/${getIdUniqueRentalInBD.body.rentals[0].id}`)
      .send(rentalUpdate);

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should reject update a rental company because need at least one matrix and return a statuscode 400', async () => {
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

    const rentalUpdate = {
      nome: 'Localiza Rent a Car',
      cnpj: '20.630.035/1001-51',
      atividades: 'Aluguel de Carros E Gestão de Frotas',
      endereco: [
        {
          cep: '96065-110',
          number: '4090',
          isFilial: true
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

    const response = await request(app)
      .put(`/api/v1/rental/${getIdUniqueRentalInBD.body.rentals[0].id}`)
      .send(rentalUpdate);

    expect(response.status).toBe(400);
  });

  it('Should reject update a rental company because need at least one matrix and returns an error description and error name', async () => {
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

    const rentalUpdate = {
      nome: 'Localiza Rent a Car',
      cnpj: '20.630.035/1001-51',
      atividades: 'Aluguel de Carros E Gestão de Frotas',
      endereco: [
        {
          cep: '96065-110',
          number: '4090',
          isFilial: true
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

    const response = await request(app)
      .put(`/api/v1/rental/${getIdUniqueRentalInBD.body.rentals[0].id}`)
      .send(rentalUpdate);

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should reject update a rental company because need at least one matrix and verify an error description and error name typeof is string', async () => {
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

    const rentalUpdate = {
      nome: 'Localiza Rent a Car',
      cnpj: '20.630.035/1001-51',
      atividades: 'Aluguel de Carros E Gestão de Frotas',
      endereco: [
        {
          cep: '96065-110',
          number: '4090',
          isFilial: true
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

    const response = await request(app)
      .put(`/api/v1/rental/${getIdUniqueRentalInBD.body.rentals[0].id}`)
      .send(rentalUpdate);

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });
});
