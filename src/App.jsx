import { useState ,useEffect} from 'react'

import './App.css'

function App() {
  var [city,setcity]=useState('');
  var [metric,setMetric]=useState('');
  var [wrep,setwrep] = useState({icon:"",temp:"",desc:"",humid:""});
 
  var mapp={
    C:"metric",F:"imperial",K:""
  };
  
  
  return (
    <>
  <div className="container">
    <h1>Weather Report</h1>
      <center>
        <div>
        <input type="text" placeholder="Enter city name" onChange={e=>setcity(e.target.value)} />
        </div>
        <br />
        <button onClick={() => {
          fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c31442d768835d35c4207b13f2e55b31&units=metric")
            .then((response) => {
                return response.json();
            }).then(value => {
              console.log(value);
              if(value.cod===200)
                setwrep({icon:value.weather[0].icon,temp:value.main.temp,desc:value.weather[0].description,humid:value.main.humidity});
              else 
                alert(value.message);
            });
          }}> Submit </button>
        <br />
        <h2><img src="../src/assets/pin.png" className='icons'/>{city}</h2>
        {wrep.icon!==""?<img src={"https://openweathermap.org/img/wn/"+wrep.icon+"@2x.png"} /> : <br /> }
        {wrep.icon!==""? <h2>{wrep.desc}</h2> :<br />}
        <h2><img src="../src/assets/thermometer.png" className='icons'/>{wrep.temp} {wrep.temp===""?"":"℃"}</h2>
        <h3><img src="../src/assets/humidity.png" className='icons'/>{wrep.humid}{wrep.humid===""?"":"%"}</h3>
        </center>
      </div>
    </>
  )
}

export default App
//https://openweathermap.org/img/wn/10d@2x.png
