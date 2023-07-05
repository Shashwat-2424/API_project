import { useState ,useEffect} from 'react'
import './App.css'
import { socket } from './socket';


function App() {
  var [city,setcity]=useState('');
  var [wrep,setwrep] = useState({icon:"",temp:"",desc:""});
  useEffect(()=>{
    function func(value){
      console.log("yo",value);
      setwrep(value);
    }
    socket.on('receive_data',func);
  },[]);
  
  function fetch(){
    socket.emit('fetchData',city);
  }
  return (
    <>
  <div class="container">
    <h1>Weather Report</h1>
      <center>
        <input type="text" placeholder="Enter city name" onChange={e=>setcity(e.target.value)} />
        <br />
        <button onClick={fetch}> Submit </button>
        <br />
        <h2>{city}</h2>
        <img src={"https://openweathermap.org/img/wn/"+wrep.icon+"@2x.png"} />
        <h2>{wrep.temp} {wrep.temp===""?"":"Degree Celcius"}</h2>
        <h3>{wrep.desc}</h3>
        </center>
      </div>
    </>
  )
}

export default App
//https://openweathermap.org/img/wn/10d@2x.png
