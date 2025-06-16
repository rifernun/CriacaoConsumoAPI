# API de games
Esta API foi desenvolvida para um melhor entendimento de ferramentas de criação de API, como axios, JWT, express...
## EndPoints
### GET /games
Endpoint responsável por retornar a listagem de todos os games cadastrados
### Parametros
Nenhum
#### Respostas
##### OK! 200
Recebe a linguagem de todos os games.

Exemplo de resposta:
```
[
    {
        "id": 1,
        "title": "Call of Duty BO2",
        "year": 2015,
        "price": 15
    },
    {
        "id": 2,
        "title": "Minecraft",
        "year": 2012,
        "price": 50
    },
    {
        "id": 3,
        "title": "Tetris",
        "year": 1980,
        "price": 10
    }
]
```

##### Falha na Autenticação! 401
Aconteceu uma falha durante o processo de autenticação da requisição.

Exemplo de resposta:
```
{
    "err": "Token invalido"
}
```

### POST /auth
Endpoint responsável por autenticar e criar sua token
### Parametros
email: E-mail do usuario cadastrado no sistema.

password: Senha do usuario cadastrado no sistema.

```
{
    "email": "teste@gmail.com",
    "password": "teste123"
}
```
#### Respostas
##### OK! 200
Caso isso aconteça você vai receber o token JWT para conseguir acessar endpoints protegidos na API.

Exemplo de resposta:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.                  eyJpZCI6MSwiZW1haWwiOiJyaWZlcm51bkBnbWFpbC5jb20iLCJpYXQiOjE3NTAwODEzMzYsImV4cCI6MTc1MDI1NDEzNn0.Zq9nWFGvGrGo1yP0bBiHLmH_RcLreP1aa-tX474g64o"
}
```

##### Falha na Autenticação! 401
Aconteceu uma falha durante o processo de autenticação da requisição. Motivos: Senha ou e-mail incorretos.

Exemplo de resposta:
```
{
    err: 'Credenciais erradas'
}
```