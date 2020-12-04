import React, {useState} from 'react';
import './App.css';

const api = {
  base: "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});


  const search = evt =>{
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=6df449730eb38fbb068024c1b2c4e939`)
        .then(res => res.json())
        .then(result => {
          setQuery('');
          setWeather(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }


  return (
    <div className="App">
      <main>
      <div id="background" className={
        (typeof weather.main != "undefined") ? `${weather.weather[0].main}`.toLowerCase() : "clear"}>
        <div id="wrapper">
          <div className="container container-fluid">
            <div className="cols search">
              <div className="col">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control search-bar"
                    placeholder="Enter city..."
                    aria-label=""
                    aria-describedby="button-addon2"
                    onChange={e => setQuery(e.target.value)}
                    value={query}
                    onKeyPress={search}
                    />
                  <div className="input-group-append">
                    <button className="btn" type="button" id="button-addon2">Search</button>
                  </div>
                </div>
              </div>
            </div>
            {(typeof weather.main != "undefined") ? (
              <div className="wrap">
                <div className="cols">
                  <div className="col help">
                    <p>Example - London, GB</p>
                  </div>
                </div>
                <div className="cols location">
                  <div className="col">
                    <h2 className="currentlocation">{weather.name}, {weather.sys.country}</h2>
                    <span className="date">{dateBuilder(new Date())}</span>
                  </div>
                </div>
                <div className="cols weather">
                  <div className="col icons">
                    <img className="icon" src={`http://openweathermap.org/img/wn/`+weather.weather[0].icon+`@2x.png`}/>
                  </div>
                  <div className="col detail">
                    <h3 className="temp">{Math.round(weather.main.temp)}°C</h3>
                  </div>
                </div>
                <div className="cols desc">
                  <div className="col">
                    <h4 className="weathernow">{weather.weather[0].description}</h4>
                  </div>
                </div>
                <div className="cols extra">
                  <div className="col">
                    <span>Humidity: {weather.main.humidity}%</span>
                  </div>
                  <div className="col">
                    <span>Visibility: {Math.round(weather.visibility/1000)}km</span>
                  </div>
                </div>
              </div>
          ) : ('')}
          </div>
        </div>
      </div>
        
      </main>
    </div>
  );
}

export default App;
