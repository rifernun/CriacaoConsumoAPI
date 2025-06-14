const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var DB = { //db falso
    games: [
        {
            id: 1,
            title: 'Call of Duty BO2',
            year: 2015,
            price: 15
        },
        {
            id: 2,
            title: 'Minecraft',
            year: 2012,
            price: 50
        },
        {
            id: 3,
            title: 'Tetris',
            year: 1980,
            price: 10
        }
    ]
}
//endpoint
app.get('/games',(req,res)=>{
    res.statusCode = 200; //requisição feita com sucesso
    res.json(DB.games); //listagem de games
});
app.get('/game/:id', (req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id); //findOne
        if(game != undefined){
            res.statusCode = 200;
            res.json(game);
        }else{
            res.sendStatus(404);
        }
    }
});
app.post('/game', (req,res) => {
    var {title,year,price} = req.body;
    DB.games.push({
        id: 111,
        title,
        year,
        price
    })
    res.sendStatus = 200;
});
app.delete('/game/:id', (req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(g => g.id == id);
        if(index == -1){
            res.statusCode(400);
        }else{
            DB.games.splice(index,1);
            res.sendStatus(200);
        }
    }
});
app.put('/game/:id', (req,res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id); //findOne
        if(game != undefined){
            var {title,year,price} = req.body;
            if(title != undefined){
                game.title = title;
            }
            if(year != undefined){
                game.year = year;
            }
            if(price != undefined){
                game.price = price;
            }
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    }
});
app.listen(8080, ()=>{
    console.log('API rodando');
});