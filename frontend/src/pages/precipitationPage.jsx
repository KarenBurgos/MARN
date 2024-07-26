import LineChartPrecipitation from "../components/chats/lineChart/lineChartPrecipitation";
import MeasureCard from "../components/cards/measureCard"
import SelectWeatherStation from "../components/selectWeatherStation";
import DataTable from "../components/tables/dataTable";
import PrecipitationTableColumns from "../Data/TableColumns/PrecipitationTableColumns";
import ConvertDataToJson from "../services/convertData";
import { useWeatherStation } from "./weatherStationProvider";

function PrecipitationPage() {
    const { selectedStation } = useWeatherStation();
    const { data, loading, error } = ConvertDataToJson();

    return (
        <section className="p-10">
            <article className="grid grid-cols-2 gap-10 justify-between w-full">
                <div>
                    <h2 className="text-white"> {!loading && !error && data.length > 0 ? data[data.length - 2].fecha : 'Cargando...'}</h2>
                    <h1 className="text-title-blue text-2xl">{selectedStation}</h1>
                </div>
                <div>
                    <h1>Estación:</h1>
                    <SelectWeatherStation />
                </div>
            </article>
            <h1 className="text-3xl text-center text-title-blue py-5">Precipitación</h1>
            <hr className='pb-5 border-lightblue-active' />
            {(!loading && !error) &&
                <article className="grid grid-cols-2 gap-[10%] ">
                    <MeasureCard title={"Precipitación"} value={((data[0].p07 + data[0].p14 + data[0].p21) / 3).toFixed(2)} unit={"mm"} />
                    <MeasureCard title={"Lluvia acumulada"} value={data[0].pd} unit={"mm"} />
                </article>
            }
            {(!loading && !error) &&
                <article className="py-10">
                    <p className='text-orange-300 text-xl text-center pt-5 pb-5'>Precipitación y cantidad de llluvia promedio por año </p>
                    <LineChartPrecipitation data={data} />
                    <hr className='pb-5 border-lightblue-active' />
                    <div className="grid grid-cols-1 gap-10 pt-5">
                        <h1 className="text-title-blue text-2xl text-center">Tabla de datos</h1>
                        <DataTable data={data} columns={PrecipitationTableColumns()} />
                    </div>
                </article>

            }
        </section>
    )
}

export default PrecipitationPage;