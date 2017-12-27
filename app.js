const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongojs = require('mongojs');
const path = require('path');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

var app = express();

app.set('view engine','ejs');
app.engine('html',ejs.renderFile);

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/',index);
app.use('/api',tasks);

app.set('port','3000');
app.listen(app.get('port'),()=>{
    console.log('Server started at '+app.get('port'));
});