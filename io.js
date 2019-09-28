function scan()
{
    document.getElementsByClassName("tick")[0].style.display = 'block';
}
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('connect');
  socket.on('scanData', function(data){ //scenario has been created
    console.log('scanDataReceived',data);
    io.emit('forwardScanData', data); //add the scenario to the world map
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

var serialport = require("serialport").SerialPort;
//var SerialPort = serialport.SerialPort; // localize object constructor
var portName = "";//portname

var sp = new serialport(portName, {
  //parser: serialport.parsers.readline("\n")r
  parser: serialport.parsers.raw
});


sp.open(function (error) {
  if ( error ) {
    console.log('failed to open: '+error);
  } else {
    console.log('open');
    sp.on('data', function(data) {
      console.log('data received: ' + String(data));
      io.emit('scanData',String(data));
    });
  }
});
app.get('/',function(req,res){
  res.redirect('/registration')
});

app.get('/registration',function(req,res){
  res.render("registration");
});

app.get('/food',function(req,res){
  res.render("food");
});

app.listen(8080,function(){
  console.log("Server Has Started");
})