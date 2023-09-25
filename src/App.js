import { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_API}`;

  const searchLocation = (event) => {
    try {
      if (!location) return;
      axios.get(url).then((res) => {
        setData(res.data);
        console.log(res.data);
        setLocation("");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app ">
      <div>
        <div className="search text-center py-6">
          <input
            type="text"
            className="p-2 rounded-lg text-white bg-transparent border font-bold"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter Location"
          />
          <button
            onClick={searchLocation}
            className="bg-black/40 py-2 rounded-lg ml-4 px-4 font-bold  border">
            Search
          </button>
        </div>
        {!data ? (
          <div className="container text-center w-[50%] h-[600px] mx-auto border border-black shadow-2xl bg-black/40 rounded-3xl p-10 flex justify-center items-center">
            <h1 className="text-6xl ">Enter the City Name</h1>
          </div>
        ) : (
          <div className="container text-center w-[50%] mx-auto border border-black shadow-2xl bg-black/40 rounded-3xl p-10">
            <div className="top flex justify-between w-full mx-auto mt-8 items-center">
              <div className="location">
                <p className="font-bold text-6xl ">
                  {data?.name}, {data?.sys?.country}
                </p>
              </div>
              <p className="font-bold text-4xl ">{}</p>
              <div className="temp">
                <h1 className="font-bold text-6xl">
                  {(((data?.main?.temp - 273.15) * 9) / 5 + 32).toFixed(2)}
                  &#176;F
                </h1>
              </div>
            </div>
            <div className="description">
              <p className="font-bold mt-36 text-5xl">
                {data?.weather[0]?.main}
              </p>
            </div>

            <div className="bottom  flex justify-between w-full mx-auto mt-48">
              <div className="feels">
                <p className="font-bold text-3xl">
                  {(((data?.main?.feels_like - 273.15) * 9) / 5 + 32).toFixed(
                    2
                  )}
                </p>
                <p>feels like</p>
              </div>
              <div className="humidity">
                <p className="font-bold text-3xl">{data?.main?.humidity}</p>
                <p>Humidity</p>
              </div>
              <div className="wind">
                <p className="font-bold text-3xl">{data.wind.speed}</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
