const request = require('supertest');
const app = require('../../../src/app');

let token;
let idUser;
let idRental;
let idCar;
let idReserve;
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
  idReserve = reserveCreated.body.id;
});

describe('Fleets', () => {
  describe('Given a Delete for remove Reservation', () => {
    describe('WHEN there is a Reserve with the specified valid idRental and idReserve', () => {
      let response;

      beforeEach(async () => {
        response = await request(app)
          .delete(`/api/v1/rental/${idRental}/reserve/${idReserve}`)
          .set('Authorization', `Bearer ${token}`);
      });

      test('THEN it should return status code 204', async () => {
        expect(response.status).toBe(204);
      });

      test('THEN it should return a empty body', async () => {
        expect(response.body).toEqual({});
      });
    });

    describe('WHEN trying to remove a Reserve with a Rental ID NotFound', () => {
      let response;
      const idRentalNotFound = '61a1ae0cfabfbb9e30e03f78';
      beforeEach(async () => {
        response = await request(app)
          .delete(`/api/v1/rental/${idRentalNotFound}/reserve/${idReserve}`)
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

    describe('WHEN trying to remove a Reserve with a Rental ID Invalid', () => {
      let response;
      const idRentalInvalid = '61a1ae0cfabfbb9e30e03f783';
      beforeEach(async () => {
        response = await request(app)
          .delete(`/api/v1/rental/${idRentalInvalid}/reserve/${idReserve}`)
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

    describe('WHEN trying to remove a Reserve with a Reserve ID NotFound', () => {
      let response;
      const idReserveNotFound = '61a1ae0cfabfbb9e30e03f78';
      beforeEach(async () => {
        response = await request(app)
          .delete(`/api/v1/rental/${idRental}/reserve/${idReserveNotFound}`)
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

    describe('WHEN trying to remove a Reserve with a Reserve ID Invalid', () => {
      let response;
      const idReserveInvalid = '61a1ae0cfabfbb9e30e03f783';
      beforeEach(async () => {
        response = await request(app)
          .delete(`/api/v1/rental/${idRental}/reserve/${idReserveInvalid}`)
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
  });
});
