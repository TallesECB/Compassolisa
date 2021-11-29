const request = require('supertest');
const app = require('../../../src/app');

let token;
let idUser;
let idRental;
let idCar;
let reserveMocks;
let valorFinal;
let idFleet;

beforeEach(async () => {
  const userAuthMock = {
    nome: 'Talles ECB',
    cpf: '013.391.372-11',
    data_nascimento: '01/05/2000',
    email: 'teduardo1310@hotmail.com',
    senha: 'talles86526696',
    habilitado: 'sim'
  };

  const userCreated = await request(app).post('/api/v1/people/').send(userAuthMock);

  idUser = userCreated.body._id;

  const response = await request(app)
    .post('/api/v1/authenticate/')
    .send({ email: userAuthMock.email, senha: userAuthMock.senha, _id: idUser });

  token = response.body.token;

  const rentalMock = {
    nome: 'Localiza Rent a a Car',
    cnpj: '31.612.734/1074-19',
    atividades: 'Aluguel de Carros E Gestão de Frotas',
    endereco: [
      {
        cep: '96065-760',
        number: '4090',
        isFilial: false
      },
      {
        cep: '96065-760',
        number: '371',
        complemento: 'Muro A',
        isFilial: true
      }
    ]
  };

  const rentalCreated = await request(app).post('/api/v1/rental/').send(rentalMock);
  idRental = rentalCreated.body.id;

  const carMock = {
    modelo: 'corsa',
    cor: 'cinza',
    ano: 1951,
    acessorios: [
      {
        descricao: 'sla'
      }
    ],
    quantidadePassageiros: 5
  };

  const carCreated = await request(app).post('/api/v1/car/').send(carMock).set('Authorization', `Bearer ${token}`);
  idCar = carCreated.body._id;

  const fleetMock = {
    id_carro: `${idCar}`,
    status: 'disponivel',
    valor_diaria: 3110.12,
    placa: 'AeGdG7l'
  };

  const fleetCreated = await request(app).post(`/api/v1/rental/${idRental}/fleet/`).send(fleetMock);
  idFleet = fleetCreated.body.id;

  const reserveMock = {
    data_inicio: '28/12/2021',
    data_fim: '30/12/2021',
    id_carro: `${idFleet}`
  };

  const reserveCreated = await request(app)
    .post(`/api/v1/rental/${idRental}/reserve/`)
    .send(reserveMock)
    .set('Authorization', `Bearer ${token}`);
  valorFinal = reserveCreated.body.valor_final;
  reserveMocks = reserveMock;
});

describe('Reserves', () => {
  describe('Given a POST for create Reservation', () => {
    describe('WHEN there is a Reserve with a valid idRental and valid body content', () => {
      let response;
      let reserveMockCreate;

      beforeEach(async () => {
        reserveMockCreate = {
          data_inicio: '01/01/2022',
          data_fim: '03/01/2022',
          id_carro: `${idFleet}`
        };

        response = await request(app)
          .post(`/api/v1/rental/${idRental}/reserve/`)
          .send(reserveMockCreate)
          .set('Authorization', `Bearer ${token}`);
      });

      test('THEN it should return status code 201', async () => {
        expect(response.status).toBe(201);
      });

      test('THEN it should return a reserve data', async () => {
        expect(response.body).toEqual({
          id: response.body.id,
          id_user: idUser,
          data_inicio: reserveMockCreate.data_inicio,
          data_fim: reserveMockCreate.data_fim,
          id_carro: idFleet,
          id_locadora: idRental,
          valor_final: valorFinal
        });
      });

      test('THEN it should return a reserve data and verify this content type', async () => {
        expect(response.body).toEqual({
          id: expect.any(String),
          id_user: expect.any(String),
          data_inicio: expect.any(String),
          data_fim: expect.any(String),
          id_carro: expect.any(String),
          id_locadora: expect.any(String),
          valor_final: expect.any(Number)
        });
      });
    });

    describe('WHEN trying to Create a Reserve with a Fleet Not Available', () => {
      let response;
      let fleetMockCreate;
      let idFleetMock;
      let reserveMockTest;
      let fleetMockTest;

      beforeEach(async () => {
        fleetMockCreate = {
          id_carro: `${idCar}`,
          status: 'indisponivel',
          valor_diaria: 3110.12,
          placa: 'AeGdK72'
        };

        fleetMockTest = await request(app).post(`/api/v1/rental/${idRental}/fleet/`).send(fleetMockCreate);
        idFleetMock = fleetMockTest.body.id;

        reserveMockTest = {
          data_inicio: '10/05/2025',
          data_fim: '20/05/2025',
          id_carro: `${idFleetMock}`
        };

        response = await request(app)
          .post(`/api/v1/rental/${idRental}/reserve/`)
          .send(reserveMockTest)
          .set('Authorization', `Bearer ${token}`);
      });

      test('THEN it should return status code 400', async () => {
        expect(response.status).toBe(400);
      });

      test('THEN it should return a Error NotFound description and name', async () => {
        expect(response.body).toEqual({
          description: expect.any(String),
          name: expect.any(String)
        });
      });
    });

    describe('WHEN trying to Create a Reserve with a Rental ID NotFound', () => {
      let response;
      const idRentalNotFound = '61a1ae0cfabfbb9e30e03f78';
      beforeEach(async () => {
        response = await request(app)
          .post(`/api/v1/rental/${idRentalNotFound}/reserve/`)
          .send(reserveMocks)
          .set('Authorization', `Bearer ${token}`);
      });

      test('THEN it should return status code 404', async () => {
        expect(response.status).toBe(404);
      });

      test('THEN it should return a Error NotFound description and name', async () => {
        expect(response.body).toEqual({
          description: expect.any(String),
          name: expect.any(String)
        });
      });
    });

    describe('WHEN trying to Create a Reserve with a Rental ID Invalid', () => {
      let response;
      const idRentalInvalid = '61a1ae0cfabfbb9e30e03f783';
      beforeEach(async () => {
        response = await request(app)
          .post(`/api/v1/rental/${idRentalInvalid}/reserve/`)
          .send(reserveMocks)
          .set('Authorization', `Bearer ${token}`);
      });

      test('THEN it should return status code 400', async () => {
        expect(response.status).toBe(400);
      });

      test('THEN it should return a Error BadRequest description and name', async () => {
        expect(response.body).toEqual([
          {
            description: expect.any(String),
            name: expect.any(String)
          }
        ]);
      });
    });

    describe('WHEN trying to Create a Reserve with a Fleet ID NotFound', () => {
      let response;
      const idFleetNotFound = '61a1ae0cfabfbb9e30e03f78';

      beforeEach(async () => {
        reserveMocks.id_carro = idFleetNotFound;
        response = await request(app)
          .post(`/api/v1/rental/${idRental}/reserve/`)
          .send(reserveMocks)
          .set('Authorization', `Bearer ${token}`);
      });

      test('THEN it should return status code 404', async () => {
        expect(response.status).toBe(404);
      });

      test('THEN it should return a Error NotFound description and name', async () => {
        expect(response.body).toEqual({
          description: expect.any(String),
          name: expect.any(String)
        });
      });
    });

    describe('WHEN trying to Create a Reserve with a Fleet ID Invalid', () => {
      let response;
      const idFleetInvalid = '61a1ae0cfabfbb9e30e03f783';

      beforeEach(async () => {
        reserveMocks.id_carro = idFleetInvalid;
        response = await request(app)
          .post(`/api/v1/rental/${idRental}/reserve/`)
          .send(reserveMocks)
          .set('Authorization', `Bearer ${token}`);
      });

      test('THEN it should return status code 400', async () => {
        expect(response.status).toBe(400);
      });

      test('THEN it should return a Error BadRequest description and name', async () => {
        expect(response.body).toEqual([
          {
            description: expect.any(String),
            name: expect.any(String)
          }
        ]);
      });
    });

    describe('WHEN trying to Create a Reserve with a Token Invalid', () => {
      let response;
      let invalidToken;

      beforeEach(async () => {
        invalidToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlZHVhcmRvMTMxMEBob3RtYWlsLmNvbSIsImhhYmlsaXRhZG8iOiJzaW0iLCJfaWQiOiI2MWEyOGZiYjE2NmZiMmM2MmRhOTc1NmYiLCJpYXQiOjE2MzgwNDM1NzksImV4cCI6MTYzODEyOTk3OX0.z7lKJUWF_2BdhgLv0hA8bQD0SBQMyjos5LHbUVcdRUG';
        response = await request(app)
          .post(`/api/v1/rental/${idRental}/reserve/`)
          .send(reserveMocks)
          .set('Authorization', `Bearer ${invalidToken}`);
      });

      test('THEN it should return status code 401', async () => {
        expect(response.status).toBe(401);
      });

      test('THEN it should return a Error Unauthorized description and name', async () => {
        expect(response.body).toEqual({
          description: expect.any(String),
          name: expect.any(String)
        });
      });
    });

    describe('WHEN trying to Create a Reserve with a start date before current date', () => {
      let response;
      let reserveMockCreate;

      beforeEach(async () => {
        reserveMockCreate = {
          data_inicio: '01/11/2021',
          data_fim: '30/11/2021',
          id_carro: `${idFleet}`
        };
        response = await request(app)
          .post(`/api/v1/rental/${idRental}/reserve/`)
          .send(reserveMockCreate)
          .set('Authorization', `Bearer ${token}`);
      });

      test('THEN it should return status code 400', async () => {
        expect(response.status).toBe(400);
      });

      test('THEN it should return a Error BadRequest description and name', async () => {
        expect(response.body).toEqual({
          description: expect.any(String),
          name: expect.any(String)
        });
      });
    });

    describe('WHEN trying to Create a Reserve with a end date to be earlier than the start date', () => {
      let response;
      let reserveMockCreate;

      beforeEach(async () => {
        reserveMockCreate = {
          data_inicio: '25/12/2021',
          data_fim: '01/12/2021',
          id_carro: `${idFleet}`
        };
        response = await request(app)
          .post(`/api/v1/rental/${idRental}/reserve/`)
          .send(reserveMockCreate)
          .set('Authorization', `Bearer ${token}`);
      });

      test('THEN it should return status code 400', async () => {
        expect(response.status).toBe(400);
      });

      test('THEN it should return a Error BadRequest description and name', async () => {
        expect(response.body).toEqual({
          description: expect.any(String),
          name: expect.any(String)
        });
      });
    });

    describe('WHEN trying to create a reservation with a Car that already has a reservation on this date_start = date_start', () => {
      let response;

      beforeEach(async () => {
        response = await request(app)
          .post(`/api/v1/rental/${idRental}/reserve/`)
          .send(reserveMocks)
          .set('Authorization', `Bearer ${token}`);
      });

      test('THEN it should return status code 409', async () => {
        expect(response.status).toBe(409);
      });

      test('THEN it should return a Error Conflict description and name', async () => {
        expect(response.body).toEqual({
          description: expect.any(String),
          name: expect.any(String)
        });
      });
    });

    describe('WHEN trying to create a reservation with a Car that already has a reservation on this date_end = date_end', () => {
      let response;
      let reserveMockCreate;

      beforeEach(async () => {
        reserveMockCreate = {
          data_inicio: '26/12/2021',
          data_fim: '30/12/2021',
          id_carro: `${idFleet}`
        };

        response = await request(app)
          .post(`/api/v1/rental/${idRental}/reserve/`)
          .send(reserveMockCreate)
          .set('Authorization', `Bearer ${token}`);
      });

      test('THEN it should return status code 409', async () => {
        expect(response.status).toBe(409);
      });

      test('THEN it should return a Error Conflict description and name', async () => {
        expect(response.body).toEqual({
          description: expect.any(String),
          name: expect.any(String)
        });
      });
    });

    describe('WHEN trying to create a reservation with a Car that already has a reservation on this date_start = date_end', () => {
      let response;
      let reserveMockCreate;

      beforeEach(async () => {
        reserveMockCreate = {
          data_inicio: '30/12/2021',
          data_fim: '05/01/2022',
          id_carro: `${idFleet}`
        };

        response = await request(app)
          .post(`/api/v1/rental/${idRental}/reserve/`)
          .send(reserveMockCreate)
          .set('Authorization', `Bearer ${token}`);
      });

      test('THEN it should return status code 409', async () => {
        expect(response.status).toBe(409);
      });

      test('THEN it should return a Error Conflict description and name', async () => {
        expect(response.body).toEqual({
          description: expect.any(String),
          name: expect.any(String)
        });
      });
    });

    describe('WHEN trying to create a reservation with a Car that already has a reservation on this date_end = date_start', () => {
      let response;
      let reserveMockCreate;

      beforeEach(async () => {
        reserveMockCreate = {
          data_inicio: '25/12/2021',
          data_fim: '28/12/2021',
          id_carro: `${idFleet}`
        };

        response = await request(app)
          .post(`/api/v1/rental/${idRental}/reserve/`)
          .send(reserveMockCreate)
          .set('Authorization', `Bearer ${token}`);
      });

      test('THEN it should return status code 409', async () => {
        expect(response.status).toBe(409);
      });

      test('THEN it should return a Error Conflict description and name', async () => {
        expect(response.body).toEqual({
          description: expect.any(String),
          name: expect.any(String)
        });
      });
    });

    describe('WHEN trying to create a reservation with a Car that already has a reservation on this date_start between other reserve for this car', () => {
      let response;
      let reserveMockCreate;

      beforeEach(async () => {
        reserveMockCreate = {
          data_inicio: '29/12/2021',
          data_fim: '31/12/2021',
          id_carro: `${idFleet}`
        };

        response = await request(app)
          .post(`/api/v1/rental/${idRental}/reserve/`)
          .send(reserveMockCreate)
          .set('Authorization', `Bearer ${token}`);
      });

      test('THEN it should return status code 409', async () => {
        expect(response.status).toBe(409);
      });

      test('THEN it should return a Error Conflict description and name', async () => {
        expect(response.body).toEqual({
          description: expect.any(String),
          name: expect.any(String)
        });
      });
    });

    describe('WHEN trying to create a reservation with a User that already has a reservation on this date_end between other reserve for this car', () => {
      let response;
      let reserveMockCreate;

      beforeEach(async () => {
        reserveMockCreate = {
          data_inicio: '20/12/2021',
          data_fim: '29/12/2021',
          id_carro: `${idFleet}`
        };

        response = await request(app)
          .post(`/api/v1/rental/${idRental}/reserve/`)
          .send(reserveMockCreate)
          .set('Authorization', `Bearer ${token}`);
      });

      test('THEN it should return status code 409', async () => {
        expect(response.status).toBe(409);
      });

      test('THEN it should return a Error Conflict description and name', async () => {
        expect(response.body).toEqual({
          description: expect.any(String),
          name: expect.any(String)
        });
      });
    });

    describe('WHEN trying to create a reservation with a User that already has a reservation on this date_start = date_start', () => {
      let response;
      let fleetMockTest;
      let idFleetMock;
      let fleetMockCreate;
      let reserveMockCreate;

      beforeEach(async () => {
        fleetMockCreate = {
          id_carro: `${idCar}`,
          status: 'disponivel',
          valor_diaria: 3110.12,
          placa: 'AeGdG72'
        };

        fleetMockTest = await request(app).post(`/api/v1/rental/${idRental}/fleet/`).send(fleetMockCreate);
        idFleetMock = fleetMockTest.body.id;

        reserveMockCreate = {
          data_inicio: '28/12/2021',
          data_fim: '30/12/2021',
          id_carro: `${idFleetMock}`
        };

        response = await request(app)
          .post(`/api/v1/rental/${idRental}/reserve/`)
          .send(reserveMockCreate)
          .set('Authorization', `Bearer ${token}`);
      });

      test('THEN it should return status code 409', async () => {
        expect(response.status).toBe(409);
      });

      test('THEN it should return a Error Conflict description and name', async () => {
        expect(response.body).toEqual({
          description: expect.any(String),
          name: expect.any(String)
        });
      });
    });

    describe('WHEN trying to create a reservation with a User that already has a reservation on this date_end = date_end', () => {
      let response;
      let reserveMockCreate;
      let fleetMockTest;
      let idFleetMock;
      let fleetMockCreate;

      beforeEach(async () => {
        fleetMockCreate = {
          id_carro: `${idCar}`,
          status: 'disponivel',
          valor_diaria: 3110.12,
          placa: 'AeGdG72'
        };

        fleetMockTest = await request(app).post(`/api/v1/rental/${idRental}/fleet/`).send(fleetMockCreate);
        idFleetMock = fleetMockTest.body.id;

        reserveMockCreate = {
          data_inicio: '26/12/2021',
          data_fim: '30/12/2021',
          id_carro: `${idFleetMock}`
        };

        response = await request(app)
          .post(`/api/v1/rental/${idRental}/reserve/`)
          .send(reserveMockCreate)
          .set('Authorization', `Bearer ${token}`);
      });

      test('THEN it should return status code 409', async () => {
        expect(response.status).toBe(409);
      });

      test('THEN it should return a Error Conflict description and name', async () => {
        expect(response.body).toEqual({
          description: expect.any(String),
          name: expect.any(String)
        });
      });
    });

    describe('WHEN trying to create a reservation with a User that already has a reservation on this date_start = date_end', () => {
      let response;
      let reserveMockCreate;
      let fleetMockTest;
      let idFleetMock;
      let fleetMockCreate;

      beforeEach(async () => {
        fleetMockCreate = {
          id_carro: `${idCar}`,
          status: 'disponivel',
          valor_diaria: 3110.12,
          placa: 'AeGdG72'
        };

        fleetMockTest = await request(app).post(`/api/v1/rental/${idRental}/fleet/`).send(fleetMockCreate);
        idFleetMock = fleetMockTest.body.id;

        reserveMockCreate = {
          data_inicio: '30/12/2021',
          data_fim: '05/01/2022',
          id_carro: `${idFleetMock}`
        };

        response = await request(app)
          .post(`/api/v1/rental/${idRental}/reserve/`)
          .send(reserveMockCreate)
          .set('Authorization', `Bearer ${token}`);
      });

      test('THEN it should return status code 409', async () => {
        expect(response.status).toBe(409);
      });

      test('THEN it should return a Error Conflict description and name', async () => {
        expect(response.body).toEqual({
          description: expect.any(String),
          name: expect.any(String)
        });
      });
    });

    describe('WHEN trying to create a reservation with a User that already has a reservation on this date_end = date_start', () => {
      let response;
      let reserveMockCreate;
      let fleetMockTest;
      let idFleetMock;
      let fleetMockCreate;

      beforeEach(async () => {
        fleetMockCreate = {
          id_carro: `${idCar}`,
          status: 'disponivel',
          valor_diaria: 3110.12,
          placa: 'AeGdG72'
        };

        fleetMockTest = await request(app).post(`/api/v1/rental/${idRental}/fleet/`).send(fleetMockCreate);
        idFleetMock = fleetMockTest.body.id;

        reserveMockCreate = {
          data_inicio: '25/12/2021',
          data_fim: '28/12/2021',
          id_carro: `${idFleetMock}`
        };

        response = await request(app)
          .post(`/api/v1/rental/${idRental}/reserve/`)
          .send(reserveMockCreate)
          .set('Authorization', `Bearer ${token}`);
      });

      test('THEN it should return status code 409', async () => {
        expect(response.status).toBe(409);
      });

      test('THEN it should return a Error Conflict description and name', async () => {
        expect(response.body).toEqual({
          description: expect.any(String),
          name: expect.any(String)
        });
      });
    });

    describe('WHEN trying to create a reservation with a User that already has a reservation on this date_start between other reserve for this User', () => {
      let response;
      let reserveMockCreate;
      let fleetMockTest;
      let idFleetMock;
      let fleetMockCreate;

      beforeEach(async () => {
        fleetMockCreate = {
          id_carro: `${idCar}`,
          status: 'disponivel',
          valor_diaria: 3110.12,
          placa: 'AeGdG72'
        };

        fleetMockTest = await request(app).post(`/api/v1/rental/${idRental}/fleet/`).send(fleetMockCreate);
        idFleetMock = fleetMockTest.body.id;

        reserveMockCreate = {
          data_inicio: '29/12/2021',
          data_fim: '31/12/2021',
          id_carro: `${idFleetMock}`
        };

        response = await request(app)
          .post(`/api/v1/rental/${idRental}/reserve/`)
          .send(reserveMockCreate)
          .set('Authorization', `Bearer ${token}`);
      });

      test('THEN it should return status code 409', async () => {
        expect(response.status).toBe(409);
      });

      test('THEN it should return a Error Conflict description and name', async () => {
        expect(response.body).toEqual({
          description: expect.any(String),
          name: expect.any(String)
        });
      });
    });

    describe('WHEN trying to create a reservation with a User that already has a reservation on this date_end between other reserve for this User', () => {
      let response;
      let reserveMockCreate;
      let fleetMockTest;
      let idFleetMock;
      let fleetMockCreate;

      beforeEach(async () => {
        fleetMockCreate = {
          id_carro: `${idCar}`,
          status: 'disponivel',
          valor_diaria: 3110.12,
          placa: 'AeGdG72'
        };

        fleetMockTest = await request(app).post(`/api/v1/rental/${idRental}/fleet/`).send(fleetMockCreate);
        idFleetMock = fleetMockTest.body.id;

        reserveMockCreate = {
          data_inicio: '20/12/2021',
          data_fim: '29/12/2021',
          id_carro: `${idFleetMock}`
        };

        response = await request(app)
          .post(`/api/v1/rental/${idRental}/reserve/`)
          .send(reserveMockCreate)
          .set('Authorization', `Bearer ${token}`);
      });

      test('THEN it should return status code 409', async () => {
        expect(response.status).toBe(409);
      });

      test('THEN it should return a Error Conflict description and name', async () => {
        expect(response.body).toEqual({
          description: expect.any(String),
          name: expect.any(String)
        });
      });
    });

    describe('WHEN trying to create a reservation with a User Not Enabled', () => {
      let response;
      let reserveMockCreate;
      let tokenMock;
      let userCreatedMockTest;
      let userMockTest;
      let userLogin;
      let idUserTest;

      beforeEach(async () => {
        userMockTest = {
          nome: 'Talles ECB',
          cpf: '013.391.372-99',
          data_nascimento: '01/05/2000',
          email: 'teduardo200@hotmail.com',
          senha: 'talles86526696',
          habilitado: 'nao'
        };

        userCreatedMockTest = await request(app).post('/api/v1/people/').send(userMockTest);
        idUserTest = userCreatedMockTest.body._id;

        userLogin = await request(app)
          .post('/api/v1/authenticate/')
          .send({ email: userCreatedMockTest.body.email, senha: userCreatedMockTest.body.senha, _id: idUserTest });
        tokenMock = userLogin.body.token;

        reserveMockCreate = {
          data_inicio: '20/12/2023',
          data_fim: '29/12/2023',
          id_carro: `${idFleet}`
        };

        response = await request(app)
          .post(`/api/v1/rental/${idRental}/reserve/`)
          .send(reserveMockCreate)
          .set('Authorization', `Bearer ${tokenMock}`);
      });

      test('THEN it should return status code 400', async () => {
        expect(response.status).toBe(400);
      });

      test('THEN it should return a Error BadRequest description and name', async () => {
        expect(response.body).toEqual({
          description: expect.any(String),
          name: expect.any(String)
        });
      });
    });
  });
});
