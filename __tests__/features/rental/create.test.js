const request = require('supertest');
const app = require('../../../src/app');

describe('Rentals', () => {
  it('should return status 201 when creating the rental company', async () => {
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
  });

  it('Should verify that the content of the return is the same as the content sent in the rental companys creation request', async () => {
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

  it('should check the type of attributes in the response when creating the rental company', async () => {
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

  it('Should reject creating a rental company because the CNPJ is the only one and returning the status code 409', async () => {
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
  });

  it('Should reject the creation because cnpj is unique and returns an error description and error name', async () => {
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

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should reject the creation because cnpj is unique and verify an error description and error name typeof is string', async () => {
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

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should reject create a rental company because need at least one matrix and return a statuscode 400', async () => {
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

    expect(response.status).toBe(400);
  });

  it('Should reject create a rental company because need at least one matrix and returns an error description and error name', async () => {
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

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should reject create a rental company because need at least one matrix and verify an error description and error name typeof is string', async () => {
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

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should If one or more required rental company attributes are missing, reject the creation and verify the status is 400', async () => {
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
  });

  it('Should If one or more required rental company attributes are missing, reject the creation and returns an error description and error name', async () => {
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

    expect(response.body[0]).toHaveProperty('description');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[1]).toHaveProperty('description');
    expect(response.body[1]).toHaveProperty('name');
  });

  it('Should If one or more required rental company attributes are missing, reject the creation and verify request body return type', async () => {
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

  it('reject a creating a rental company with duplicate CNPJ and return erro code 409', async () => {
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
  });

  it('reject a creating a rental company with duplicate CNPJ and returns an error description and error name', async () => {
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

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('reject a creating a rental company with duplicate CNPJ and verify request body return type', async () => {
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

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should reject create a rental company and return error code 409, because Main Office is Unique', async () => {
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

    const response = await request(app).post(`/api/v1/rental/`).send(rental);

    expect(response.status).toBe(409);
  });

  it('Should reject create a rental company and return error description and error name, because Main Office is Unique', async () => {
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

    const response = await request(app).post(`/api/v1/rental/`).send(rental);

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('name');
  });

  it('Should reject create a rental company and validating the requests return type, because Main Office is Unique', async () => {
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

    const response = await request(app).post(`/api/v1/rental/`).send(rental);

    expect(response.body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });
});
