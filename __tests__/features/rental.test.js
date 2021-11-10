const request = require('supertest');
const app = require('../../src/app');
const Database = require('../../src/infra/database/mongo/index');
const RentalSchema = require('../../src/app/schema/RentalSchema');

Database.connect();

beforeAll(async () => {
  await RentalSchema.deleteMany();
});

beforeEach(async () => {
  await RentalSchema.deleteMany();
});

afterAll(async () => {
  await RentalSchema.deleteMany();
  Database.disconnect();
});

describe('Rentals', () => {
  it('Must create a rental company', async () => {
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

    const response = await request(app).post('/api/v1/rental/').send(rental);

    expect(response.status).toBe(201);
    expect(response.body.nome).toBe(rental.nome);
    expect(response.body.cnpj).toBe(rental.cnpj);
    expect(response.body.atividades).toBe(rental.atividades);
    expect(response.body.endereco[0].cep).toBe(rental.endereco[0].cep);
    expect(response.body.endereco[0].number).toBe(rental.endereco[0].number);
    expect(response.body.endereco[0].complemento).toBe(rental.endereco[0].complemento);
    expect(response.body.endereco[1].cep).toBe(rental.endereco[1].cep);
    expect(response.body.endereco[1].number).toBe(rental.endereco[1].number);
    expect(response.body.endereco[1].complemento).toBe(rental.endereco[1].complemento);
    expect(response.body.endereco[2].cep).toBe(rental.endereco[2].cep);
    expect(response.body.endereco[2].number).toBe(rental.endereco[2].number);
    expect(response.body.endereco[2].complemento).toBe(rental.endereco[2].complemento);
    expect(typeof response.body.id).toBe('string');
    expect(typeof response.body.nome).toBe('string');
    expect(typeof response.body.cnpj).toBe('string');
    expect(typeof response.body.atividades).toBe('string');
    expect(typeof response.body.endereco).toBe('object');
    expect(typeof response.body.endereco[0].cep).toBe('string');
    expect(typeof response.body.endereco[0].number).toBe('string');
    expect(typeof response.body.endereco[0].complemento).toBe('undefined');
    expect(typeof response.body.endereco[0].isFilial).toBe('undefined');
    expect(typeof response.body.endereco[0]._id).toBe('undefined');
    expect(typeof response.body.endereco[1].cep).toBe('string');
    expect(typeof response.body.endereco[1].number).toBe('string');
    expect(typeof response.body.endereco[1].complemento).toBe('string');
    expect(typeof response.body.endereco[1].isFilial).toBe('undefined');
    expect(typeof response.body.endereco[1]._id).toBe('undefined');
    expect(typeof response.body.endereco[2].cep).toBe('string');
    expect(typeof response.body.endereco[2].number).toBe('string');
    expect(typeof response.body.endereco[2].complemento).toBe('string');
    expect(typeof response.body.endereco[2].isFilial).toBe('undefined');
    expect(typeof response.body.endereco[2]._id).toBe('undefined');
  });

  it('Should reject create a rental company because the CNPJ is the unique', async () => {
    const rentalOne = {
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

    const rentalTwo = {
      nome: 'Localiza Car',
      cnpj: '20.630.035/1001-51',
      atividades: 'Aluguel de Carros',
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

    await request(app).post('/api/v1/rental/').send(rentalOne);

    const response = await request(app).post('/api/v1/rental/').send(rentalTwo);

    expect(response.status).toBe(409);
    expect(typeof response.body.description).toBe('string');
    expect(typeof response.body.name).toBe('string');
    expect(typeof response.body.id).toBe('undefined');
    expect(typeof response.body.nome).toBe('undefined');
    expect(typeof response.body.cnpj).toBe('undefined');
    expect(typeof response.body.atividades).toBe('undefined');
    expect(typeof response.body.endereco).toBe('undefined');
  });

  it('Should reject create a rental company because need at least one matrix', async () => {
    const rental = {
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

    const response = await request(app).post('/api/v1/rental/').send(rental);

    expect(response.status).toBe(409);
    expect(typeof response.body.description).toBe('string');
    expect(typeof response.body.name).toBe('string');
    expect(typeof response.body.id).toBe('undefined');
    expect(typeof response.body.nome).toBe('undefined');
    expect(typeof response.body.cnpj).toBe('undefined');
    expect(typeof response.body.atividades).toBe('undefined');
    expect(typeof response.body.endereco).toBe('undefined');
  });

  it('Should If one or more required rental company attributes are missing, reject the creation', async () => {
    const rental = {
      nome: 'Localiza Rent a Car',
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

    const response = await request(app).post('/api/v1/rental/').send(rental);

    expect(response.status).toBe(400);
    expect(typeof response.body[0].description).toBe('string');
    expect(typeof response.body[0].name).toBe('string');
    expect(typeof response.body[1].description).toBe('string');
    expect(typeof response.body[1].name).toBe('string');
  });

  it('reject a creating a rental company with duplicate CNPJ', async () => {
    const rentalOne = {
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

    const rentalTest = {
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

    await request(app).post('/api/v1/rental/').send(rentalOne);

    const response = await request(app).post('/api/v1/rental/').send(rentalTest);

    expect(response.status).toBe(409);
    expect(typeof response.body.description).toBe('string');
    expect(typeof response.body.name).toBe('string');
    expect(typeof response.body.id).toBe('undefined');
    expect(typeof response.body.nome).toBe('undefined');
    expect(typeof response.body.cnpj).toBe('undefined');
    expect(typeof response.body.atividades).toBe('undefined');
    expect(typeof response.body.endereco).toBe('undefined');
  });

  it('Should remove the Rental Company by your ID', async () => {
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

  it('Dont remove a Rental Company for an ID that has already been deleted or because the ID was not found', async () => {
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
    expect(typeof response.body.description).toBe('string');
    expect(typeof response.body.name).toBe('string');
  });

  it('Should reject get by ID for invalid format', async () => {
    const rental = {
      _id: '618b166b363c64ea493b5ec03'
    };

    const response = await request(app).get(`/api/v1/rental/${rental._id}`);

    expect(response.status).toBe(400);
    expect(typeof response.body[0].description).toBe('string');
    expect(typeof response.body[0].name).toBe('string');
  });

  it('Should reject get by ID for Not Found', async () => {
    const rental = {
      _id: '618b166b363c64ea493b5ec0'
    };

    const response = await request(app).get(`/api/v1/rental/${rental._id}`);

    expect(response.status).toBe(404);
    expect(typeof response.body.description).toBe('string');
    expect(typeof response.body.name).toBe('string');
  });

  it('Should get by ID', async () => {
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
    expect(typeof response.body.id).toBe('string');
    expect(typeof response.body.nome).toBe('string');
    expect(typeof response.body.cnpj).toBe('string');
    expect(typeof response.body.atividades).toBe('string');
    expect(typeof response.body.endereco).toBe('object');
    expect(typeof response.body.endereco[0].cep).toBe('string');
    expect(typeof response.body.endereco[0].number).toBe('string');
    expect(typeof response.body.endereco[0].complemento).toBe('undefined');
    expect(typeof response.body.endereco[0].isFilial).toBe('undefined');
    expect(typeof response.body.endereco[0]._id).toBe('undefined');
    expect(typeof response.body.endereco[1].cep).toBe('string');
    expect(typeof response.body.endereco[1].number).toBe('string');
    expect(typeof response.body.endereco[1].complemento).toBe('string');
    expect(typeof response.body.endereco[1].isFilial).toBe('undefined');
    expect(typeof response.body.endereco[1]._id).toBe('undefined');
    expect(typeof response.body.endereco[2].cep).toBe('string');
    expect(typeof response.body.endereco[2].number).toBe('string');
    expect(typeof response.body.endereco[2].complemento).toBe('string');
    expect(typeof response.body.endereco[2].isFilial).toBe('undefined');
    expect(typeof response.body.endereco[2]._id).toBe('undefined');
  });

  it('Must update a rental company by ID', async () => {
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
    expect(response.body.nome).toBe(rentalUpdate.nome);
    expect(response.body.cnpj).toBe(rentalUpdate.cnpj);
    expect(response.body.atividades).toBe(rentalUpdate.atividades);
    expect(response.body.endereco[0].cep).toBe(rentalUpdate.endereco[0].cep);
    expect(response.body.endereco[0].number).toBe(rentalUpdate.endereco[0].number);
    expect(response.body.endereco[0].complemento).toBe(rentalUpdate.endereco[0].complemento);
    expect(response.body.endereco[1].cep).toBe(rentalUpdate.endereco[1].cep);
    expect(response.body.endereco[1].number).toBe(rentalUpdate.endereco[1].number);
    expect(response.body.endereco[1].complemento).toBe(rentalUpdate.endereco[1].complemento);
    expect(response.body.endereco[2].cep).toBe(rentalUpdate.endereco[2].cep);
    expect(response.body.endereco[2].number).toBe(rentalUpdate.endereco[2].number);
    expect(response.body.endereco[2].complemento).toBe(rentalUpdate.endereco[2].complemento);
    expect(typeof response.body.id).toBe('string');
    expect(typeof response.body.nome).toBe('string');
    expect(typeof response.body.cnpj).toBe('string');
    expect(typeof response.body.atividades).toBe('string');
    expect(typeof response.body.endereco).toBe('object');
    expect(typeof response.body.endereco[0].cep).toBe('string');
    expect(typeof response.body.endereco[0].number).toBe('string');
    expect(typeof response.body.endereco[0].complemento).toBe('undefined');
    expect(typeof response.body.endereco[0].isFilial).toBe('undefined');
    expect(typeof response.body.endereco[0]._id).toBe('undefined');
    expect(typeof response.body.endereco[1].cep).toBe('string');
    expect(typeof response.body.endereco[1].number).toBe('string');
    expect(typeof response.body.endereco[1].complemento).toBe('string');
    expect(typeof response.body.endereco[1].isFilial).toBe('undefined');
    expect(typeof response.body.endereco[1]._id).toBe('undefined');
    expect(typeof response.body.endereco[2].cep).toBe('string');
    expect(typeof response.body.endereco[2].number).toBe('string');
    expect(typeof response.body.endereco[2].complemento).toBe('string');
    expect(typeof response.body.endereco[2].isFilial).toBe('undefined');
    expect(typeof response.body.endereco[2]._id).toBe('undefined');
  });

  it('Should reject update a rental company by ID because ID Not Found', async () => {
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
    expect(typeof response.body.description).toBe('string');
    expect(typeof response.body.name).toBe('string');
    expect(typeof response.body.id).toBe('undefined');
    expect(typeof response.body.nome).toBe('undefined');
    expect(typeof response.body.cnpj).toBe('undefined');
    expect(typeof response.body.atividades).toBe('undefined');
    expect(typeof response.body.endereco).toBe('undefined');
  });

  it('Should reject update a rental company by ID because ID Invalid Format', async () => {
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
    expect(typeof response.body[0].description).toBe('string');
    expect(typeof response.body[0].name).toBe('string');
    expect(typeof response.body.id).toBe('undefined');
    expect(typeof response.body.nome).toBe('undefined');
    expect(typeof response.body.cnpj).toBe('undefined');
    expect(typeof response.body.atividades).toBe('undefined');
    expect(typeof response.body.endereco).toBe('undefined');
  });

  it('Should reject update a rental company by ID because one or more requireds attributes are missing', async () => {
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
    expect(typeof response.body[0].description).toBe('string');
    expect(typeof response.body[0].name).toBe('string');
    expect(typeof response.body[1].description).toBe('string');
    expect(typeof response.body[1].name).toBe('string');
    expect(typeof response.body.id).toBe('undefined');
    expect(typeof response.body.nome).toBe('undefined');
    expect(typeof response.body.cnpj).toBe('undefined');
    expect(typeof response.body.atividades).toBe('undefined');
    expect(typeof response.body.endereco).toBe('undefined');
  });

  it('Should reject update a rental company by ID because CEP Not Found', async () => {
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
    expect(typeof response.body.description).toBe('string');
    expect(typeof response.body.name).toBe('string');
    expect(typeof response.body.id).toBe('undefined');
    expect(typeof response.body.nome).toBe('undefined');
    expect(typeof response.body.cnpj).toBe('undefined');
    expect(typeof response.body.atividades).toBe('undefined');
    expect(typeof response.body.endereco).toBe('undefined');
  });
});
