
# Compassolisa

This is an API of a luxury and semi-luxury car rental system


## Features

- Cars Crud
- Peoples Crud
- Authentication User
- Pagination


## Tech Stack

**Server**:

- NodeJS -> v.16.8.0
- MongoDB -> v.4.4.9

**Dependencies:** 

    @joi/date: v.2.1.0
    express: v.4.17.1,
    joi: v.17.4.2,
    jsonwebtoken: v.8.5.1,
    moment": v.2.29.1,
    mongoose": v.6.0.11
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


## API Reference

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
  GET /api/v1/car/${idCar}
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
| `quantidadedePassageiros`      | `number` | **Required**. Quantidade de Passageiros -> Car |




#### Update Car

``` localhost:3000
  POST /api/v1/car/${idCar}
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
| `quantidadedePassageiros`      | `number` | **Required**. Quantidade de Passageiros -> Car |



#### Remove Car

``` localhost:3000
  DELETE /api/v1/car/${idCar}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `objectId` | **Required**. Id of Car to fetch for Delete |



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
  GET /api/v1/people/${idPeople}
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
  POST /api/v1/people/${idPeople}
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
  DELETE /api/v1/people/${idPeople}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `objectId` | **Required**. Id of People to fetch for Delete |

## Authors

- [@TallesECB](https://github.com/TallesECB)


## Support

For support, email talles.balardin_BOLS@compasso.com.br or join our Meet Channel.
