import { useNavigate } from "react-router-dom";
import WeatherDashboardCard from "../components/weatherDashboardCard";
import SelectWeatherStation from "../components/selectWeatherStation";
import MapSelector from "../components/MapSelector";
import { useState } from "react";
import { useWeatherStation } from "./weatherStationProvider";
import SanAndres from "../"
import ConvertDataToJson from "../services/convertData";

const HomeDashboard = () => {
  const { selectedStation } = useWeatherStation();
  const [stationData, setStationData] = useState({});



  const data = ConvertDataToJson()
  console.log("data: ", data)

  return (
    <section className="p-10">
      <section className="grid grid-cols-2 gap-10">
        <article>
          <h2 className="text-white">{data[0].fecha}</h2>
          <h1 className="text-title-blue text-2xl">{selectedStation}</h1>
          <WeatherDashboardCard data={data} />
        </article>
        <article>
          <span>
            <h1>Estación:</h1>
            <SelectWeatherStation />
          </span>
          <MapSelector data={data} />
        </article>
      </section>
    </section>
  );
};

export default HomeDashboard;