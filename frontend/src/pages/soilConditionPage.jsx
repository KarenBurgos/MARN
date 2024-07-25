import HeatMapSoil from "../components/chats/heatMap/heatMapSoil";
import MeasureCard from "../components/chats/measureCard";
import SelectWeatherStation from "../components/selectWeatherStation";
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
                    <h2 className="text-white"> {!loading && !error && data.length > 0 ? data[0].fecha : 'Cargando...'}</h2>
                    <h1 className="text-title-blue text-2xl">{selectedStation}</h1>
                </div>
                <div>
                    <h1>Estación:</h1>
                    <SelectWeatherStation />
                </div>
            </article>
            <h1 className="text-3xl text-center text-title-blue py-5">Condicion del suelo</h1>
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
                        <HeatMapSoil data={data} />
                    </div>
                </>
            }
        </section>
    )
}

export default SoilConditionPage;