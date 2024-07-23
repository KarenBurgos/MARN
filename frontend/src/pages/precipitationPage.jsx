import LineChartPrecipitation from "../components/chats/lineChart/lineChartPrecipitation";
import MeasureCard from "../components/chats/measureCard"
import SelectWeatherStation from "../components/selectWeatherStation";
import ConvertDataToJson from "../services/convertData";
import { useWeatherStation } from "./weatherStationProvider";

function PrecipitationPage(){
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
            <h1 className="text-3xl text-center text-title-blue py-5">Precipitación</h1>
            {(!loading && !error) &&
                <article className="grid grid-cols-3 gap-5 ">
                    <MeasureCard title={"Precipitación"} value={((data[0].p07 + data[0].p14 + data[0].p21)/3)} unit={"mm"} />
                    <MeasureCard title={"Lluvia acumulada"} value={data[0].pd} unit={"mm"} />
                </article>
            }
            {(!loading && !error) &&
                <>
                    <LineChartPrecipitation data={data}/>
                </>
            }
        </section>
    )
}

export default PrecipitationPage;