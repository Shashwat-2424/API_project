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
// app.post("/",function(req,res){
//    // console.log(req);
//     const city_name = String(req.body.city);
//     const url = "https://api.openweathermap.org/data/2.5/weather?q="+city_name+"&appid=c31442d768835d35c4207b13f2e55b31&units=metric";
//     https.get(url,function(res1){
//        // console.log(res1.statusCode);
//         res1.on("data",function(data){
//             const wrep = JSON.parse(data);
//             console.log(wrep);
            
//             /*const icon = "http://openweathermap.org/img/wn/"+wrep.weather[0].icon+"@2x.png";
//             const x = String(req.body.city)+" temperature is "+wrep.main.temp;
//             res.write("<p>Current Weather condition of "+(city_name)+" is "+wrep.weather[0].description+"</p>");
//             res.write("<h1>"+x+"</h1>");
//             res.write("<img src = "+icon+">");
//             res.send(); */
//         });
//     });
// });

io.on('connection',(socket)=>{
    socket.on('fetchData',(city_name)=>{
        console.log(city_name);
        const url = "https://api.openweathermap.org/data/2.5/weather?q="+city_name+"&appid=c31442d768835d35c4207b13f2e55b31&units=metric";
        https.get(url,(res)=>{
            res.on("data",data=>{
                var wrep = JSON.parse(data);
                console.log(wrep);
                socket.emit('receive_data',{icon:wrep.weather[0].icon,temp:wrep.main.temp,desc:wrep.weather[0].description});
            });
        });
    });
});

server.listen(3000,function(){
    console.log("Its working, yo!");
})