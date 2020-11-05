var express = require("express"); 
var bodyParser = require("body-parser"); 
var path = require('path');
const fetch = require('node-fetch');

const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/form'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 
  
var app = express(); 
  
app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({ 
    extended: true
})); 
  
app.post('/sign_up', function(req,res){ 
    var name = req.body.name; 
    var email =req.body.email; 
    var password = req.body.password; 
    var phone =req.body.phone; 
  
    var data = { 
        "name": name, 
        "email":email, 
        "password":password, 
        "phone":phone 
    } 
db.collection('details').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
              
    }); 
          
    res.sendFile(path.join(__dirname + '/signup_success.html'));
}) 
  
  
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname + '/index.html'));
res.set({ 
    'Access-control-Allow-Origin': '*'
    }); 

}).listen(3000) 
  
/*fetch('http://127.0.0.1:3000/')
    .then(res => res.text())
    .then(text => console.log(text))*/
  
console.log("server listening at port 3000"); 