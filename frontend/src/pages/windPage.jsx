import LineChartWind from "../components/chats/lineChart/lineChartWind";
import MeasureCard from "../components/chats/measureCard";
import RadarChartWind from "../components/chats/radarChart/radarChartWind";
import SelectWeatherStation from "../components/selectWeatherStation";
import ConvertDataToJson from "../services/convertData";
import { useWeatherStation } from "./weatherStationProvider";

function WindPage(){
    const { selectedStation } = useWeatherStation();
    const { data, loading, error } = ConvertDataToJson();

    return(
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
        <h1 className="text-3xl text-center text-title-blue py-5">Viento y visibilidad</h1>
        {(!loading && !error) &&
            <article className="grid grid-cols-3 gap-5 ">
                <MeasureCard title={"Velocidad del viento"} value={data[0].sa} unit={""} />
                <MeasureCard title={"Rumbo Dominante"} value={data[0].rd} unit={""} />
                <MeasureCard title={"Visibilidad"} value={(data[0].vis07 + data[0].vis14 + data[0].vis21 )/3} unit={"km"} />
            </article>
        }
        {(!loading && !error) &&
            <>
                <div className="grid grid-cols-2 gap-10 py-10">
                    {/* <RadarChartWind data={data}/> */}
                    <LineChartWind data={data}/>
                </div>
            </>
        }
    </section>
    )
}

export default WindPage;
