import {useState} from 'react';
import axios from 'axios'
import "./App.css"


function App() {

  const [data,setData] = useState({})
  const [location,setLocation] = useState('')
  const [error,setError] = useState("")
  const searchLocation =()=>{

    window.localStorage.setItem("last-location",location);

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=216d3a11f03070de81381689c50209bb`).then((res)=>{
      setData(res.data);
      console.log(res.data)
      
    }).catch((err)=>{
        setError(" Enter valid city ")
    })
    
    
  }

  
  return (
    <div className="container">
      <h1 className="heading">Weather App</h1>

      <input 
      placeholder="Enter city name"
      value={location}
      className="input"
      onChange={(e)=>{setLocation(e.target.value)
       }}
      
      />

      <button onClick={searchLocation}>Search</button>

      <div className='data-area'>

      {location?<p>Weather details of the city : {location}</p>:null}

      

      {location ? <p>Current Temperature:  {data.main.temp.toFixed()-273} *C</p> : null}
      {location?<p>Temperature Range: {data.main.temp_min.toFixed() -273} *C to {data.main.temp_max.toFixed()-273} *C</p>: null}
      {location ?<p>Humidity: {data.main.humidity} </p>: null}
      {location?<p>Sea level : 1002 </p>: null}
      {location?<p>Ground level: 963 </p> : null}

      {!location ? <p>Last 3 cities : {window.localStorage.getItem("last-location")}</p>  :  null} 
      
       <div className='error-message'>{!location? error:null}
      </div>

      </div>
    </div>
  );
}

export default App;
