const express = require('express');
const body_parser = require('body-parser');
const https = require("https");
const app = express();

app.use(body_parser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    console.log(req);
    const city_name = String(req.body.city);
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+(city_name)+"&appid=c31442d768835d35c4207b13f2e55b31&units=metric#";
    https.get(url,function(res1){
        console.log(res1.statusCode);
        res1.on("data",function(data){
            const wrep = JSON.parse(data);
            const icon = "http://openweathermap.org/img/wn/"+wrep.weather[0].icon+"@2x.png";
            const x = String(req.body.city)+" temperature is "+wrep.main.temp;
            res.write("<p>Current Weather condition of "+(city_name)+" is "+wrep.weather[0].description+"</p>");
            res.write("<h1>"+x+"</h1>");
            res.write("<img src = "+icon+">");
            res.send();
        });
    });
});

app.listen(3000,function(){
    console.log("Its working, yo!");
})