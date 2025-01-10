import axios from 'axios'
import { useState } from 'react';
import { FaSearch, FaWind} from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [temp, setTemp] = useState(0)
  const [city, setCity] = useState("")

  const searchWeather = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6bbe5777fbfd07c3818cb7ff374d8f2b`)
        .then((res) => setWeatherData(res.data))
      setTemp(weatherData.main.temp - 273.15)
  }
  

  console.log(weatherData)
  return (
    <div className="h-screen w-full bg-[#EFF5FE] flex flex-col justify-center items-center">
      <div className="flex w-[90%] max-w-[690px] rounded bg-white shadow-md">
        <input
          className="w-full border-none bg-transparent px-4 py-2 text-gray-600 outline-none"
          type="search"
          name="search"
          placeholder="Search..."
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          type="submit"
          className="m-2 rounded bg-blue-600 px-4 py-2 text-white flex items-center justify-center"
          onClick={searchWeather}
        >
          <FaSearch />
        </button>
      </div>
      {weatherData == null ? null : <div className='bg-white w-[400px] h-[560px] rounded-2xl mt-10 flex items-center flex-col'>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@4x.png`}
          className="w-[250px] h-[250px]"
        />
        <h1 className='text-[50px] font-bold'>{Math.floor(temp)}°C</h1>
        <h1 className='text-[50px] font-bold'>{weatherData?.name}</h1>

        <div className="w-full flex justify-between">
          <div className="text-center m-7 flex items-center">
            <WiHumidity size={40} className='text-slate-400'/>
            <div>
              <h1 className="text-2xl font-bold">{weatherData?.main.humidity}%</h1>
              <h1 className="text-gray-500">Humidity</h1>
            </div>
          </div>
          <div className="text-center m-7 flex items-center">
            <FaWind size={40} className='text-slate-400'/>
            <div>
              <h1 className="text-2xl font-bold">{weatherData?.wind.speed} km/h</h1>
              <h1 className="text-gray-500">Wind Speed</h1>
            </div>
          </div>
        </div>

      </div>}
      
    </div>
  )
}

export default App
