//Make Connection
var socket = io.connect('http://192.168.1.2:5000');

//Listen
socket.on('processing',function(data){
    document.getElementById("waiting").innerHTML = data;
});

socket.on('userdata',function(data){
    document.getElementById("id").innerHTML = data.code;
    document.getElementById("name").innerHTML = data.Name;
});

socket.on('done',function(data){
    document.getElementById("waiting").innerHTML = data.text;
    document.getElementById(data.image).style.display = "block";
    setTimeout(function(){
        document.getElementById("id").innerHTML = "";
    document.getElementById("name").innerHTML = "";
    document.getElementById("waiting").innerHTML = "Waiting for Next Person...";
    document.getElementById(data.image).style.display = "none";
    },1500);
});