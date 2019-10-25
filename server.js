const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//Load models
const Message = require('./models/message');
const app = express();
//load keys file
const keys = require('./config/keys');
//use body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//connect to mLab MongoDB
mongoose.connect(keys.MongoDB,{useNewUrlParser:true}).then(() => {
    console.log('Server is connected to MongoDB');
}).catch((err) => {
    console.log(err);
});
//environment var for port
const port = process.env. PORT || 3000;
//setup view engine
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');

app.get('/',(req,res) => {
    res.render('home',{
        title: 'Home'
    });
});

app.get('/about',(req,res) => {
    res.render('about', {
        title:'About'
    });
});

app.get('/contact',(req,res) => {
    res.render('contact',{
        title: 'Contact'
    });
});

app.post('/contactUs',(req,res) => {
    console.log(req.body);
});

app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});