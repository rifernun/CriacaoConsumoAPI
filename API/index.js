const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const DB = require('./database');

const JWTSecret = 'wazsxredctfvygbuhnjmi';

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


function auth(req,res,next){
    const authToken = req.headers['authorization'];
    if(authToken != undefined){
        const bearer = authToken.split(' ');
        var token = bearer[1];
        jwt.verify(token, JWTSecret, (err,data)=>{
            if(err){
                res.status(401);
                res.json({err: 'Token invalido'});
            }else{
                req.token = token;
                req.loggedUser = {id: data.id, email: data.email};
                next(); //tudo autorizado aqui
            }
        });
    }else{
        res.status(401);
        res.json({err: 'Token invalido'});
    }
}

//endpoint
app.get('/games',auth,(req,res)=>{ //feito
    var HATEOAS = [
        {
            href: 'http://localhost/8080/game/0',
            method: 'GET',
            rel: 'get_game'
        },
        {
            href: 'http://localhost/8080/game/0',
            method: 'DELETE',
            rel: 'delete_game'
        },
        {
            href: 'http://localhost/8080/game/0',
            method: 'PUT',
            rel: 'update_game'
        },
        {
            href: 'http://localhost/8080/game',
            method: 'POST',
            rel: 'create_game'
        },
        {
            href: 'http://localhost/8080/auth',
            method: 'POST',
            rel: 'login'
        }
    ];
    res.statusCode = 200; //requisição feita com sucesso
    DB.select().table('games').then(data => {
        res.json({games: data, _links: HATEOAS}); //listagem de games
    }).catch(err => {
        console.log(err);
    });
});

app.get('/game/:id',auth, (req,res)=>{ //feito
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);

        var HATEOAS = [
            {
                href: 'http://localhost/8080/game/'+id,
                method: 'GET',
                rel: 'get_game'
            },
            {
                href: 'http://localhost/8080/game/'+id,
                method: 'DELETE',
                rel: 'delete_game'
            },
            {
                href: 'http://localhost/8080/game/'+id,
                method: 'PUT',
                rel: 'edit_game'
            },
            {
                href: 'http://localhost/8080/games',
                method: 'GET',
                rel: 'get_all_games'
            }
        ];
        DB.select().where({id: id}).table('games').then(game => {
            if(game != undefined){
                res.statusCode = 200;
                res.json({game: game, _links: HATEOAS});
            }else{
                res.sendStatus(404);
            }
        }).catch(err => {
            console.log(err);
        }); 
        
    }
});

app.post('/game',auth, (req,res) => { //feito
    var {title,year,price} = req.body;
    DB.insert({title: title, year: year, price: price}).table('games').then(data => {
        res.sendStatus = 200;
    }).catch(err => {
        console.log(err);
    })
});

app.delete('/game/:id',auth, (req,res)=>{ //feito
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        DB.where({id: id}).delete().table('games').then(data => {
            res.sendStatus(200);
        }).catch(err => {
            res.statusCode(400);
            console.log(err);
        });
    }
});

app.put('/game/:id',auth, (req,res) => { //feito
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        var id = parseInt(req.params.id);
        var {title,year,price} = req.body;
        DB.where({id:id}).update({title: title, year: year, price: price}).table('games').then(() => {
            res.sendStatus(200);
        }).catch(err => {
            console.log(err);
            res.sendStatus(404);
        });
    }
});

app.post('/auth', (req,res)=>{
    var {email,password} = req.body;

    if(email != undefined){
        var user = DB.users.find(user => user.email == email);
        if(user != undefined){

            if(user.password == password){
                jwt.sign({id: user.id, email: user.email}, JWTSecret,{expiresIn: '48h'}, (err,token)=>{
                    if(err){
                        res.status(400);
                        res.json({err: 'Falha interna'});
                    }else{
                        res.status(200);                
                        res.json({token: token});
                    }
                });
                
            }else{
                res.status(401);
                res.json({err: 'Credenciais erradas'});
            }


        }else{
            res.status(404);
            res.json({err: 'E-mail enviado não existe'});
        }
    }else{
        res.status(400);
        res.json({err: 'E-mail invalido'});
    }
});

app.listen(8080, ()=>{
    console.log('API rodando');
});