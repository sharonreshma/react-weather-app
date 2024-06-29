import "./App.css";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import "react-toastify/dist/ReactToastify.css";
import TemperatureAndLocation from "./components/TemperatureAndLocation";
import Forecast from "./components/Forecast";
import { useEffect, useState } from "react";
import getFormattedWeatherData from "./services/weatherService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "coimbatore" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getFormattedWeatherData({ ...query, units });
        setWeather(data);
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );
      } catch (error) {
        console.error("Error fetching weather data:", error);
        toast.error("Failed to fetch weather data. Please try again later.");
      }
    };
    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";

    const threshold = units === "metric" ? 20 : 60; // Adjust threshold based on units
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";
    
    return "from-yellow-700 to-orange-700";
  };

  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br ${formatBackground()} h-fit shadow-xl shadow-gray-400`}>
      <ToastContainer /> {/* ToastContainer for displaying toast notifications */}
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TemperatureAndLocation weather={weather} />
          <Forecast title="3 hour forecast" data={weather.hourly} />
          <Forecast title="daily forecast" data={weather.daily} />
        </>
      )}
    </div>
  );
}

export default App;
