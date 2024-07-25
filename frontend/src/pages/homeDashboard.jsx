import WeatherDashboardCard from "../components/weatherDashboardCard";
import SelectWeatherStation from "../components/selectWeatherStation";
import MapSelector from "../components/MapSelector";
import { useWeatherStation } from "./weatherStationProvider";
import ConvertDataToJson from "../services/convertData";
import ChartDashboard from "../components/chats/chartDashboard";

const HomeDashboard = () => {
  const { selectedStation } = useWeatherStation();
  const { data, loading, error } = ConvertDataToJson();

  return (
    <section className="p-10">
      <section className="grid grid-cols-2 gap-10 grid-rows-2 justify-between w-full">
        <article>
          <h2 className="text-white"> {!loading && !error && data.length > 0 ? data[0].fecha : 'Cargando...'}</h2>
          <h1 className="text-title-blue text-2xl">{selectedStation}</h1>
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error.message}</div>}
          {!loading && !error && <WeatherDashboardCard data={data} />}
        </article>
        <article>
          <span>
            <h1>Estación:</h1>
            <SelectWeatherStation />
          </span>
          {!loading && !error && <MapSelector data={data} />}
        </article>
        <section className="col-start-1 col-end-3">
          {!loading && !error && <ChartDashboard data={data} />}
        </section>
      </section>

    </section>
  );
};

export default HomeDashboard;