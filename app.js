var express = require('express');
var app = express();
var readline = require('readline');
var mysql = require('mysql')
var spawn = require('child_process').spawn;
var serial = spawn('python',['../read.py']);
serial.stdin.setDefaultEncoding('utf-8');

readline.createInterface({
    input: serial.stdout,
    terminal: false
}).on('line',function(line){
    console.log("Line: "+line);
    processRequest(line);
    serial.stdin.write("\n");
});
var socket = require('socket.io');
var tab;

app.use(express.static('css'));
app.use(express.static('assets'));
app.use(express.static('js'));
app.set("view engine","ejs");

var con = mysql.createConnection({
    host: "localhost",
    user: "aravindh",
    password: "aravindh",
    database: "kalpana"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MYSQL!");
});

app.get('/',function(req,res){
    res.redirect('/registration')
});

app.get('/registration',function(req,res){
    tab = "check_in";
    console.log("Registeration" + tab);
    res.render("registration");
});

app.get('/dinner',function(req,res){
    tab = "dinner";
    res.render("dinner");
});

app.get('/latenightsnacks',function(req,res){
    tab = "latesnack";
    res.render("latenightsnacks");
});

app.get('/breakfast',function(req,res){
    tab = "breakfast";
    res.render("breakfast");
});

app.get('/lunch',function(req,res){
    tab = "lunch";
    res.render("lunch");
});

// app.get('/food',function(req,res){
//     res.render("food");
// });

var server = app.listen(5000,function(){
    console.log("Server Has Started");
});

var io = socket(server);

io.on('connection',function(socket){
    console.log("Client Connected: "+socket);
});

function processRequest(barcode){
    console.log("Processing: "+barcode);
    io.sockets.emit('processing',"Please Wait...");
    var query = "SELECT code,Name FROM member WHERE code='"+barcode+"'";
    con.query(query,function(err,result){
        if(err){
            console.log(err);
        }
        else{
            // console.log(result);
            io.sockets.emit('userdata',result[0]);
            var update = "UPDATE member set "+tab+"= 1 WHERE code='"+barcode+"'";
            con.query(update,function(err,result){
                if(err){
                    console.log(err);
                }
                else{
                io.sockets.emit('done',{text: "Success",image: "register_success"});
                }
            });
        }
    });
}