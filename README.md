
# Compassolisa

This is an API of a luxury and semi-luxury car rental system


## Features
- Peoples Crud
- Authentication User
- Cars Crud
- Rentals Crud
- Pagination
- Tests Jest


## Tech Stack

**Server**:

- NodeJS -> v.16.8.0
- MongoDB -> v.4.4.9

**Dependencies:** 

    @joi/date: v.2.1.0,
    express: v.4.17.1,
    joi: v.17.4.2,
    jsonwebtoken: v.8.5.1,
    moment": v.2.29.1,
    mongoose": v.6.0.11,
    mongoose-paginate-v2: v.1.4.2,
    swagger-ui-express: v.4.1.6,
    axios: v.0.24.0

**Dev Dependencies:** 

    eslint: v.7.32.0,
    eslint-config-airbnb-base: v.14.2.1,
    eslint-config-plugin: v.1.0.11,
    eslint-config-prettier": v.8.3.0,
    eslint-plugin-import": v.2.25.2,
    jest: v.27.3.1,
    nodemon: v.2.0.14",
    prettier: v.2.4.1,
    supertest: v.6.1.6

## Run Locally

Clone the project

```bash
  git clone https://github.com/TallesECB/Compassolisa
```

Go to the project directory

```bash
  cd Compassolisa
```

Install dependencies

```bash
  npm install
```

Create an .env for development - Example

```arquivo
  DB_HOST= 127.0.0.1
  DB_USER=
  DB_PASS=
  DB_NAME= DataBaseName
  DB_PORT= 3000
  DB_COLLECTION = CollectionName 
  MONGO_URL=mongodb://localhost:27017/CollectionName
```
Create an .env.test for running the tests - Example 

```arquivo
  DB_HOST= 127.0.0.1
  DB_USER=
  DB_PASS=
  DB_NAME= DataBaseName_test
  DB_PORT= 3000
  DB_COLLECTION = CollectionName_test 
  MONGO_URL=mongodb://localhost:27017/CollectionName_test
```

Start the server - Modo de desenvolvimento

```bash
  npm run dev
```

Start the node

```bash
  npm run start
```

Run the tests - Jest

```bash
  npm run test __tests__/features/user/
```

```bash
  npm run test __tests__/features/rental/
```

```bash
  npm run test __tests__/features/car/
```

```bash
  npm run test __tests__/features/authentication/
```

Run the all tests - Jest

```bash
  npm run test --runInBand
```

Open using Swagger - Browser Acess

```navegador
  http://localhost:3000/api-docs/
```

Open using Heroku - Browser Acess

```navegador
  https://compassolisa02.herokuapp.com/api-docs/#/
```

## API Reference

#### Get all Peoples

``` localhost:3000
  GET /api/v1/people/?nome=Talles Eduardo&offset=0&limit=10
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `queryparam` | `string` | **Opcional**. QueryParms of People to fetch |
| `offset`  | `number` | **Opcional**. Your offset - Pagination  | - this default is 0
| `limit`   | `number` | **Opcional**. Your limit - Pagination  | - this default is 1000



#### Get People

``` localhost:3000
  GET /api/v1/people/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `objectId` | **Required**. Id of People to fetch |



#### Create People

``` localhost:3000
  POST /api/v1/people/
```
| Body | Type  | Description                       |
| :--------  | :------- | :-------------------------------- |
| `nome`   | `string` | **Required**. Nome -> People |
| `cpf`      | `string` | **Required - Unique**. Cpf -> People |
| `data_nascimento`      | `date` | **Required**. Data de Nascimento -> People |
| `email`      | `string.email` | **Required - Unique**. Email de autenticação -> People |
| `senha`      | `string` | **Required**. Senha de autenticação -> People |
| `habilitado`      | `enum - ('Sim', 'Não')` | **Required**. Habilitação - CNH -> People |




#### Update People

``` localhost:3000
  PUT /api/v1/people/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `objectId` | **Required**. Id of people to fetch for update a specific People |

| Body | Type  | Description                       |
| :--------  | :------- | :-------------------------------- |
| `nome`   | `string` | **Required**. Nome -> People |
| `cpf`      | `string` | **Required - Unique**. Cpf -> People |
| `data_nascimento`      | `date` | **Required**. Data de Nascimento -> People |
| `email`      | `string.email` | **Required - Unique**. Email de autenticação ->People |
| `senha`      | `string` | **Required**. Senha de autenticação -> People |
| `habilitado`      | `enum - ('Sim', 'Não')` | **Required**. Habilitação - CNH -> People |


#### Remove People

``` localhost:3000
  DELETE /api/v1/people/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `objectId` | **Required**. Id of People to fetch for Delete |


#### Authenticate People

``` localhost:3000
  POST /api/v1/authenticate/
```
| Body | Type  | Description                       |
| :--------  | :------- | :-------------------------------- |
| `email`      | `string.email` | **Required**. Email de autenticação ->People |
| `senha`      | `string` | **Required**. Senha de autenticação -> People |

### To use the Car Route it is necessary to be authenticated.

#### Get all Cars 

``` localhost:3000
  GET /api/v1/car/?cor=Yellowa&offset=0&limit=30
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `queryparam` | `string` | **Opcional**. QueryParms of Car to fetch |
| `offset`  | `number` | **Opcional**. Your offset - Pagination  | - this default is 0
| `limit`   | `number` | **Opcional**. Your limit - Pagination  | - this default is 1000

#### Get Car

``` localhost:3000
  GET /api/v1/car/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `objectId` | **Required**. Id of Car to fetch |



#### Create Car

``` localhost:3000
  POST /api/v1/car/
```
| Body | Type  | Description                       |
| :--------  | :------- | :-------------------------------- |
| `modelo`   | `string` | **Required**. Modelo -> Car |
| `cor`      | `string` | **Required**. Cor -> Car |
| `ano`      | `number` | **Required**. Ano -> Car |
| `acessorios [ { descricao: "" } ]`      | `array - object: string` | **Required**. Acessorios - Descricao -> Car |
| `quantidadePassageiros`      | `number` | **Required**. Quantidade de Passageiros -> Car |


#### Update Car

``` localhost:3000
  PUT /api/v1/car/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `objectId` | **Required**. Id of Car to fetch for update a specific Car |

| Body | Type  | Description                       |
| :--------  | :------- | :-------------------------------- |
| `modelo`   | `string` | **Required**. Modelo -> Car |
| `cor`      | `string` | **Required**. Cor -> Car |
| `ano`      | `number` | **Required**. Ano -> Car |
| `acessorios [ { descricao: "" } ]`      | `array - object: string` | **Required**. Acessorios - Descricao -> Car |
| `quantidadePassageiros`      | `number` | **Required**. Quantidade de Passageiros -> Car |

#### Update Car Acessory

``` localhost:3000
  PUT /api/v1/car/${id}/acessorios/${idAcessory}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `objectId` | **Required**. Id of Car to fetch a specific Car |
| `idAcessory`      | `objectId` | **Required**. Id of Acessory to fetch a specific Acessory in Car |

| Body | Type  | Description                       |
| :--------  | :------- | :-------------------------------- |
| `descricao`   | `string` | **Required**. Descricao -> Car Acessory |


#### Remove Car

``` localhost:3000
  DELETE /api/v1/car/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `objectId` | **Required**. Id of Car to fetch for Delete |


#### Get all Rentals

``` localhost:3000
  GET /api/v1/rental/?nome=Localiza Rent a Car&offset=0&limit=10
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `queryparam` | `string` | **Opcional**. QueryParms of Rental to fetch |
| `offset`  | `number` | **Opcional**. Your offset - Pagination  | - this default is 0
| `limit`   | `number` | **Opcional**. Your limit - Pagination  | - this default is 1000



#### Get Rental

``` localhost:3000
  GET /api/v1/people/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `objectId` | **Required**. Id of Rental to fetch |



#### Create Rental

``` localhost:3000
  POST /api/v1/rental/
```
| Body | Type  | Description                       |
| :--------  | :------- | :-------------------------------- |
| `nome`   | `string` | **Required**. Nome -> Rental |
| `cnpj`      | `string` | **Required - Unique**. CNPJ -> Rental |
| `atividades`      | `string` | **Required**. Atividades -> Rental |
| `endereco`      | `array` | **Required**. Endereco -> Rental |
| `endereco.cep`      | `string` | **Required**. Endereco - CEP -> Rental |
| `endereco.number`      | `string` | **Required**. Endereco - Number -> Rental |
| `endereco.complemento`      | `string` | **Opcional**. Endereco - Complemento -> Rental |
| `endereco.isFilial`      | `boolean` | **Required**. Endereco - isFilial -> Rental |

#### Update Rental

``` localhost:3000
  PUT /api/v1/rental/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `objectId` | **Required**. Id of rental to fetch for update a specific Rental |

| Body | Type  | Description                       |
| :--------  | :------- | :-------------------------------- |
| `nome`   | `string` | **Required**. Nome -> Rental |
| `cnpj`      | `string` | **Required - Unique**. CNPJ -> Rental |
| `atividades`      | `string` | **Required**. Atividades -> Rental |
| `endereco`      | `array` | **Required**. Endereco -> Rental |
| `endereco.cep`      | `string` | **Required**. Endereco - CEP -> Rental |
| `endereco.number`      | `string` | **Required**. Endereco - Number -> Rental |
| `endereco.complemento`      | `string` | **Opcional**. Endereco - Complemento -> Rental |
| `endereco.isFilial`      | `boolean` | **Required**. Endereco - isFilial -> Rental |


#### Remove Rental

``` localhost:3000
  DELETE /api/v1/rental/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `objectId` | **Required**. Id of Rental to fetch for Delete |


## Authors

- [@TallesECB](https://github.com/TallesECB)


## Support

For support, email talles.balardin_BOLS@compasso.com.br or join our Meet Channel.

