var express = require('express');
var app = express();

app.use(express.static('css'));
app.use(express.static('assets'));
app.use(express.static('js'));
app.set("view engine","ejs");

app.get('/',function(req,res){
    res.redirect('/registration')
});

app.get('/registration',function(req,res){
    res.render("registration");
});

app.get('/food',function(req,res){
    res.render("food");
});

app.get('/help',function(req,res){
});

app.get('/Schedule',function(req,res){
    res.render("Schedule");
});

app.listen(8080,function(){
    console.log("Server Has Started");
})

