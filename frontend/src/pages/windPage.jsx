import LineChartWind from "../components/chats/lineChart/lineChartWind";
import MeasureCard from "../components/cards/measureCard";
import RadarChartWind from "../components/chats/radarChart/radarChartWind";
import SelectWeatherStation from "../components/selectWeatherStation";
import DataTable from "../components/tables/dataTable";
import WindTableColumns from "../Data/TableColumns/WindsTableColumn";
import ConvertDataToJson from "../services/convertData";
import { useWeatherStation } from "./weatherStationProvider";
import BeaufortTable from "../components/tables/beaufortTableExplanation";

function WindPage() {
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
            <h1 className="text-3xl text-center text-title-blue py-5">Viento y visibilidad</h1>
            <hr className='pb-5 border-lightblue-active' />
            {(!loading && !error) &&
                <article className="grid grid-cols-3 gap-5 ">
                    <MeasureCard title={'Velocidad del viento'} subtitle={'(Escala de Beaufort)'} value={Math.floor(data[0].sa)} unit={''} />
                    <MeasureCard title={"Rumbo Dominante"} value={data[0].rd} unit={""} />
                    <MeasureCard title={"Visibilidad"} value={((data[0].vis07 + data[0].vis14 + data[0].vis21) / 3).toFixed(2)} unit={"km"} />
                </article>
            }
            {(!loading && !error) &&
                <>
                    <div className="grid grid-cols-2 gap-10 py-10 h-full text-title-blue">
                        <span>
                            <div>
                            <p className='text-orange-300 text-xl text-center pt-5'>Velocidad del viento promedio por mes</p>
                                <LineChartWind data={data} />
                            </div>
                            <div>
                            <p className='text-orange-300 text-xl text-center'>Velocidad del viento promedio por mes</p>
                                <RadarChartWind data={data} />
                            </div>
                        </span>
                        <BeaufortTable />
                    </div>
                    <div>
                        <DataTable data={data} columns={WindTableColumns()} />
                    </div>
                </>
            }
        </section>
    )
}

export default WindPage;
