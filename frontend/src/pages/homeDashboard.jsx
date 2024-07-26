import WeatherDashboardCard from "../components/cards/weatherDashboardCard";
import SelectWeatherStation from "../components/selectWeatherStation";
import MapSelector from "../components/MapSelector";
import { useWeatherStation } from "./weatherStationProvider";
import ConvertDataToJson from "../services/convertData";
import ChartDashboard from "../components/chats/chartDashboard";

const HomeDashboard = () => {
  const { selectedStation } = useWeatherStation();
  const { data, loading, error } = ConvertDataToJson();

  console.log([data.length])
  return (
    <section className="px-[3%] py-[2%]">
      <section className="grid grid-cols-2 gap-x-[3%] gap-y-[5%] grid-rows-2 justify-between w-full ">
        <article className="flex flex-col justify-between">
          <span className="pb-5">
            <h2 className="text-white"> {!loading && !error && data.length > 0 ? data[data.length - 2].fecha : 'Cargando...'}</h2> {/* TODO: fix last row empty (data.length-2) */}
            <h1 className="text-title-blue text-2xl">{selectedStation}</h1>
          </span>
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error.message}</div>}
          {!loading && !error && <WeatherDashboardCard data={data} />}
        </article>
        <article>
            <span>
              <h1>Estación:</h1>
              <SelectWeatherStation />
            </span>
            <div className="h-full pt-5">
              {!loading && !error && <MapSelector data={data} />}
            </div>
          
        </article>
        <section className="col-start-1 col-end-3 flex flex-col justify-center item h-full">
          <h1 className="text-title-blue text-xl pb-5 text-center"> gráfica  de temperatura del día {!loading && !error && data.length > 0 ? data[data.length - 2].fecha : 'Cargando...'}</h1>
          {!loading && !error && <ChartDashboard data={data} />}
        </section>
      </section>

    </section>
  );
};

export default HomeDashboard;