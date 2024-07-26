import HeatMapHumidityByMonth from "../components/chats/heatMap/heatMapHumidityByMonth";
import HeatMapHumidityByYear from "../components/chats/heatMap/heatMapByHumidityYear";
import MeasureCard from "../components/cards/measureCard";
import SelectWeatherStation from "../components/selectWeatherStation";
import ConvertDataToJson from "../services/convertData";
import { useWeatherStation } from "./weatherStationProvider";
import LineChartHumidity from "../components/chats/lineChart/lineChartHumidity";
import LineChartNubosity from "../components/chats/lineChart/lineChartNubosity";
import DewConditionCategory from "../services/dewConditionCategory";
import HeatMapDew from "../components/chats/heatMap/heatMapDew";
import HumidityTableColumns from "../Data/TableColumns/HumidityTableColumns";
import DataTable from "../components/tables/dataTable";

function HumidityPage() {
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
            <h1 className="text-3xl text-center text-title-blue py-5">Humedad y condiciones del aire</h1>
            <hr className='pb-5 border-lightblue-active' />
            {(!loading && !error) &&
                <article className="grid grid-cols-4 gap-5 ">
                    <MeasureCard title={"Humedad relativa"} value={data[0].hr} unit={"%"} />
                    <MeasureCard title={"Nubosidad"} value={data[0].nub} unit={""} />
                    <MeasureCard title={"Presión de vapor"} value={(data[0].pvp).toFixed(2)} unit={"mmHg"} />
                    <MeasureCard title={"Estado de rocio"} value={DewConditionCategory(data[0].er07)} unit={" rocio"} />
                </article>
            }
            {(!loading && !error) &&
                <>
                    <div className="grid grid-cols-1 gap-10 py-10">
                        <div>
                            <p className='text-orange-300 text-xl text-center pt-5 pb-5'>Temperatura media por mes</p>
                            <HeatMapHumidityByMonth data={data} />
                        </div>
                        <div>
                            <p className='text-orange-300 text-xl text-center pt-5 pb-5'>Temperatura media por año</p>
                            <HeatMapHumidityByYear data={data} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-10 py-5">
                        <div>
                            <p className='text-orange-300 text-xl text-center pb-5'>Humedad media por mes</p>
                            <LineChartHumidity data={data} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-10 py-5">
                        <div>
                            <p className='text-orange-300 text-xl text-center pb-5'>Nubosidad por mes</p>
                            <LineChartNubosity data={data} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-10 py-5">
                        <div>
                            <p className='text-orange-300 text-xl text-center pt-5 pb-5'>Cantida de rocío por mes</p>
                            <HeatMapDew data={data} />
                        </div>
                    </div>
                    <hr className='pb-5 border-lightblue-active' />
                    <div className="grid grid-cols-1 gap-10 pt-5">
                        <h1 className="text-title-blue text-2xl text-center">Tabla de datos</h1>
                        <DataTable data={data} columns={HumidityTableColumns()} />
                    </div>
                </>
            }
        </section>
    )
}

export default HumidityPage;