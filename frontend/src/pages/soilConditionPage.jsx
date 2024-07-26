import HeatMapSoil from "../components/chats/heatMap/heatMapSoil";
import MeasureCard from "../components/cards/measureCard";
import SelectWeatherStation from "../components/selectWeatherStation";
import DataTable from "../components/tables/dataTable";
import SoilTableColumns from "../Data/TableColumns/SoildTableColum";
import ConvertDataToJson from "../services/convertData";
import SoilConditionCategory from "../services/soilConditionCategory";
import { useWeatherStation } from "./weatherStationProvider";

function SoilConditionPage() {
    const { selectedStation } = useWeatherStation();
    const { data, loading, error } = ConvertDataToJson();

    return (
        <section className="p-10 ">
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
            <h1 className="text-3xl text-center text-title-blue py-5">Condición del suelo</h1>
            <hr className='pb-5 border-lightblue-active' />
            {(!loading && !error) &&
                <article className="grid grid-cols-3 gap-5 ">
                    <MeasureCard title={"Estado del suelo"} value={SoilConditionCategory(data[0].es07)} unit={"7:00 a.m."} />
                    <MeasureCard title={"Estado del suelo"} value={SoilConditionCategory(data[0].es14)} unit={" 2:00 p.m."} />
                    <MeasureCard title={"Estado del suelo"} value={SoilConditionCategory(data[0].es21)} unit={" 9:00 p.m."} />

                </article>
            }
            {(!loading && !error) &&
                <>
                    <div className="grid grid-cols-1 gap-10 py-10">
                        <div>
                        <p className='text-orange-300 text-xl text-center pt-5 pb-5'>Condición del suelo por mes</p>
                            <HeatMapSoil data={data} />
                        </div>
                    </div>
                    <hr className='pb-5 border-lightblue-active' />
                    <div className="grid grid-cols-1 gap-10 pt-5">
                        <h1 className="text-title-blue text-2xl text-center">Tabla de datos</h1>
                        <DataTable data={data} columns={SoilTableColumns()} />
                    </div>
                </>
            }
        </section>
    )
}

export default SoilConditionPage;