const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
var knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'pankajismad1',
      database : 'smartbrain'
    }
  });
// const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors()); 

const database = {
    users:[
        {
            id:'123',
            name:'john',
            email:'john@gmail.com',
            password:'abc123',
            entries:0,
            joined: new Date()
        },
        {
            id:'124',
            name:'mike',
            email:'mike@gmail.com',
            password:'abc1234',
            entries:0,
            joined: new Date()
        }
    ],
}

app.get('/',(req,res) => {
    res.send('this is working');
});

app.post('/signin',(req,res) => {signin.handleSignin(req,res,db,bcrypt)});
app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)});
app.get('/profile/:id',(req,res) => {profile.handleProfileGet(req,res,db)});
app.put('/image',(req,res) => {image.handleImage(req,res,db)});
app.post('/imageurl',(req,res) => {image.handleApiCall(req,res)});


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is listening on port ${process.env.PORT || 3000}`);
});

console.log(PORT);