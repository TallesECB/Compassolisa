const request = require('supertest');
const app = require('../../../src/app');

let token;
let idUser;
let idRental;
let idCar;
let idReserve;
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
  idReserve = reserveCreated.body.id;
  valorFinal = reserveCreated.body.valor_final;
  reserveMocks = reserveMock;
});

describe('Reserves', () => {
  describe('Given a Get By Params for get Reservation', () => {
    describe('WHEN there is a Reserve with the specified valid idRental and Query Parm', () => {
      let response;

      beforeEach(async () => {
        response = await request(app)
          .get(`/api/v1/rental/${idRental}/reserve/?data_inicio=28/12/2021`)
          .set('Authorization', `Bearer ${token}`);
      });

      test('THEN it should return status code 200', async () => {
        expect(response.status).toBe(200);
      });

      test('THEN it should return a reserve data', async () => {
        expect(response.body.reservas).toEqual([
          {
            id: idReserve,
            id_user: idUser,
            data_inicio: reserveMocks.data_inicio,
            data_fim: reserveMocks.data_fim,
            id_carro: idFleet,
            id_locadora: idRental,
            valor_final: valorFinal
          }
        ]);
      });

      test('THEN it should return a reserve data and verify this content type', async () => {
        expect(response.body.reservas).toEqual([
          {
            id: expect.any(String),
            id_user: expect.any(String),
            data_inicio: expect.any(String),
            data_fim: expect.any(String),
            id_carro: expect.any(String),
            id_locadora: expect.any(String),
            valor_final: expect.any(Number)
          }
        ]);
      });
    });

    describe('WHEN trying to get a Reserve with a Rental ID NotFound', () => {
      let response;
      const idRentalNotFound = '61a1ae0cfabfbb9e30e03f78';
      beforeEach(async () => {
        response = await request(app)
          .get(`/api/v1/rental/${idRentalNotFound}/reserve/?data_inicio=28/11/2021`)
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

    describe('WHEN trying to get a Reserve with a Rental ID Invalid', () => {
      let response;
      const idRentalInvalid = '61a1ae0cfabfbb9e30e03f783';
      beforeEach(async () => {
        response = await request(app)
          .get(`/api/v1/rental/${idRentalInvalid}/reserve/?data_inicio=28/11/2021`)
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

    describe('WHEN trying to get a Reserve with a Reserve Query Parm Not Found', () => {
      let response;
      beforeEach(async () => {
        response = await request(app)
          .get(`/api/v1/rental/${idRental}/reserve/?data_inicio=01/12/2021`)
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

    describe('WHEN trying to get a Reserve with a Reserve Query Parm Invalid', () => {
      let response;
      beforeEach(async () => {
        response = await request(app)
          .get(`/api/v1/rental/${idRental}/reserve/?QueryInvalid=testForQueryInvalid`)
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
