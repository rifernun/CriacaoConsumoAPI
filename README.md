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