const express = require('express');
const body_parser = require('body-parser');
const https = require("https");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(body_parser.urlencoded({extended:true}));


const http = require("http");
const { Server } = require("socket.io");


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
io.on('connection',(socket)=>{
    socket.on('fetchData',(res1)=>{
        var city_name = res1.city, unit = res1.unit;
        console.log(res1);
        const url = "https://api.openweathermap.org/data/2.5/weather?q="+city_name+"&appid=55cddf331cb6da7e928db07649dffa1c&units=metric";
        https.get(url,(res)=>{
            res.on("data",data=>{
                var wrep = JSON.parse(data);
                console.log(wrep);
                socket.emit('receive_data',wrep);
            });
        });
    });
});

server.listen(3000,function(){
    console.log("Its working, yo!");
})