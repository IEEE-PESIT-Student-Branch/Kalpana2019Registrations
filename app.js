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

app.get('/dinner',function(req,res){
    res.render("dinner");
});

app.get('/latenightsnacks',function(req,res){
    res.render("latenightsnacks");
});

app.get('/breakfast',function(req,res){
    res.render("breakfast");
});

app.get('/lunch',function(req,res){
    res.render("lunch");
});

app.get('/food',function(req,res){
    res.render("food");
});


app.listen(8080,function(){
    console.log("Server Has Started");
})

