
# Compassolisa

This is an API of a luxury and semi-luxury car rental system


## Features
- Peoples Crud
- Authentication User
- Cars Crud
- Rentals Crud
- Pagination


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
    mongoose-unique-validator: v.3.0.0",
    swagger-ui-express: v.4.1.6,
    axios: v.0.24.0,
    nodemon: v.2.0.14

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

Start the server

```bash
  npm run dev
```

Start the node

```bash
  npm run start
```

Start the tests

```bash
  npm run tests
```


## API Reference

#### Get all Peoples

``` localhost:3000
  GET /api/v1/people/?name=Talles Eduardo&offset=0&limit=10
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
| `cpf`      | `string` | **Required**. Cpf -> People |
| `data_nascimento`      | `date` | **Required**. Data de Nascimento -> People |
| `email`      | `string.email` | **Required**. Email de autenticação -> People |
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
| `cpf`      | `string` | **Required**. Cpf -> People |
| `data_nascimento`      | `date` | **Required**. Data de Nascimento -> People |
| `email`      | `string.email` | **Required**. Email de autenticação ->People |
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



## Authors

- [@TallesECB](https://github.com/TallesECB)


## Support

For support, email talles.balardin_BOLS@compasso.com.br or join our Meet Channel.

