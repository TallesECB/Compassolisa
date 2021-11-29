const request = require('supertest');
const app = require('../../../src/app');

let token;
let idUser;
let idRental;
let idCar;
let idFleet;
let fleetCreated;

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

  fleetCreated = await request(app).post(`/api/v1/rental/${idRental}/fleet/`).send(fleetMock);
  idFleet = fleetCreated.body.id;
});

describe('Fleets', () => {
  describe('Given a PUT for update Fleet', () => {
    describe('WHEN there is a Update with the specified valid idRental and valid body content', () => {
      let response;
      let fleetMockUpdate;

      beforeEach(async () => {
        fleetMockUpdate = {
          id_carro: `${idCar}`,
          status: 'disponivel',
          valor_diaria: 3110.12,
          placa: 'AeGdG75'
        };

        response = await request(app).put(`/api/v1/rental/${idRental}/fleet/${idFleet}`).send(fleetMockUpdate);
      });

      test('THEN it should return status code 200', async () => {
        expect(response.status).toBe(200);
      });

      test('THEN it should return a fleet data', async () => {
        expect(response.body).toEqual({
          id: idFleet,
          id_carro: fleetMockUpdate.id_carro,
          id_locadora: idRental,
          status: fleetMockUpdate.status,
          valor_diaria: fleetMockUpdate.valor_diaria,
          placa: fleetMockUpdate.placa
        });
      });

      test('THEN it should return a fleet data and verify this content type', async () => {
        expect(response.body).toEqual({
          id: expect.any(String),
          id_carro: expect.any(String),
          id_locadora: expect.any(String),
          status: expect.any(String),
          valor_diaria: expect.any(Number),
          placa: expect.any(String)
        });
      });
    });

    describe('WHEN trying to Update a Fleet with a Rental ID NotFound', () => {
      let response;
      const idRentalNotFound = '61a1ae0cfabfbb9e30e03f78';
      let fleetMockUpdate;

      beforeEach(async () => {
        fleetMockUpdate = {
          id_carro: `${idCar}`,
          status: 'disponivel',
          valor_diaria: 3110.12,
          placa: 'AeGdG75'
        };
        response = await request(app).put(`/api/v1/rental/${idRentalNotFound}/fleet/${idFleet}`).send(fleetMockUpdate);
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

    describe('WHEN trying to Update a Fleet with a Rental ID Invalid', () => {
      let response;
      const idRentalInvalid = '61a1ae0cfabfbb9e30e03f783';
      let fleetMockUpdate;

      beforeEach(async () => {
        fleetMockUpdate = {
          id_carro: `${idCar}`,
          status: 'disponivel',
          valor_diaria: 3110.12,
          placa: 'AeGdG75'
        };
        response = await request(app).put(`/api/v1/rental/${idRentalInvalid}/fleet/${idFleet}`).send(fleetMockUpdate);
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

    describe('WHEN trying to Update a Fleet with a Fleet ID NotFound', () => {
      let response;
      const idFleetNotFound = '61a1ae0cfabfbb9e30e03f78';
      let fleetMockUpdate;

      beforeEach(async () => {
        fleetMockUpdate = {
          id_carro: `${idCar}`,
          status: 'disponivel',
          valor_diaria: 3110.12,
          placa: 'AeGdG75'
        };
        response = await request(app).put(`/api/v1/rental/${idRental}/fleet/${idFleetNotFound}`).send(fleetMockUpdate);
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

    describe('WHEN trying to Update a Fleet with a Fleet ID Invalid', () => {
      let response;
      const idFleetInvalid = '61a1ae0cfabfbb9e30e03f783';
      let fleetMockUpdate;

      beforeEach(async () => {
        fleetMockUpdate = {
          id_carro: `${idCar}`,
          status: 'disponivel',
          valor_diaria: 3110.12,
          placa: 'AeGdG75'
        };
        response = await request(app).put(`/api/v1/rental/${idRental}/fleet/${idFleetInvalid}`).send(fleetMockUpdate);
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

    describe('WHEN trying to Update a Fleet with a Car ID NotFound', () => {
      let response;
      let fleetMockUpdate;

      beforeEach(async () => {
        fleetMockUpdate = {
          id_carro: `61a1ae0cfabfbb9e30e03f78`,
          status: 'disponivel',
          valor_diaria: 3110.12,
          placa: 'AeGdG75'
        };

        response = await request(app).put(`/api/v1/rental/${idRental}/fleet/${idFleet}`).send(fleetMockUpdate);
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

    describe('WHEN trying to Update a Fleet with a Car ID Invalid', () => {
      let response;
      let fleetMockUpdate;

      beforeEach(async () => {
        fleetMockUpdate = {
          id_carro: `61a1ae0cfabfbb9e30e03f783`,
          status: 'disponivel',
          valor_diaria: 3110.12,
          placa: 'AeGdG75'
        };
        response = await request(app).put(`/api/v1/rental/${idRental}/fleet/${idFleet}`).send(fleetMockUpdate);
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

    describe('WHEN trying to Update a Fleet with duplicate plate', () => {
      let response;
      let fleetMockDuplicatePlate;
      let fleetMockTest;

      beforeEach(async () => {
        fleetMockTest = {
          id_carro: `${idCar}`,
          status: 'disponivel',
          valor_diaria: 3110.12,
          placa: 'AeGdG78'
        };
        response = await request(app).post(`/api/v1/rental/${idRental}/fleet/`).send(fleetMockTest);

        fleetMockDuplicatePlate = {
          id_carro: `${idCar}`,
          status: 'disponivel',
          valor_diaria: 3110.12,
          placa: 'AeGdG78'
        };
        response = await request(app).put(`/api/v1/rental/${idRental}/fleet/${idFleet}`).send(fleetMockDuplicatePlate);
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
  });
});
