import HeatMapHumidityByMonth from "../components/chats/heatMap/heatMapHumidityByMonth";
import HeatMapHumidityByYear from "../components/chats/heatMap/heatMapByHumidityYear";
import TemperatureMaxMinProm from "../components/chats/lineChart/temperatureMaxMinProm";
import MeasureCard from "../components/chats/measureCard";
import SelectWeatherStation from "../components/selectWeatherStation";
import ConvertDataToJson from "../services/convertData";
import { useWeatherStation } from "./weatherStationProvider";
import LineChartHumidity from "../components/chats/lineChart/lineChartHumidity";
import LineChartHumidityByYear from "../components/chats/lineChart/lineChartNubosity";
import LineChartNubosity from "../components/chats/lineChart/lineChartNubosity";

function HumidityPage() {
    const { selectedStation } = useWeatherStation();
    const { data, loading, error } = ConvertDataToJson();

    return (
        <section className="p-10">
            <article className="grid grid-cols-2 gap-10 justify-between w-full">
                <div>
                    <h2 className="text-white"> {!loading && !error && data.length > 0 ? data[0].fecha : 'Cargando...'}</h2>
                    <h1 className="text-title-blue text-2xl">{selectedStation}</h1>
                </div>
                <div>
                    <h1>Estación:</h1>
                    <SelectWeatherStation />
                </div>
            </article>
            <h1 className="text-3xl text-center text-title-blue py-5">Humedad y condiciones del aire</h1>
            {(!loading && !error) &&
                <article className="grid grid-cols-3 gap-5 ">
                    <MeasureCard title={"Humedad relativa"} value={data[0].hr} unit={"%"} />
                    <MeasureCard title={"Nubosidad"} value={data[0].nub} unit={""} />
                    <MeasureCard title={"Presión de vapor"} value={data[0].pvp} unit={"mmHg"} />
                </article>
            }
            {(!loading && !error) &&
                <>
                    <div className="grid grid-cols-2 gap-10 py-10">
                        <HeatMapHumidityByMonth data={data} />
                        <HeatMapHumidityByYear data={data} />
                    </div>
                    <div className="grid grid-cols-2 gap-10 py-10">
                        <LineChartHumidity data={data}/>
                        <LineChartNubosity data={data}/>
                    </div>
                </>
            }
        </section>
    )
}

export default HumidityPage;