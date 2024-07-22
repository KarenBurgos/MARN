import { useEffect, useState } from "react";
import CloudinessLineChart from "../components/chats/cloudinessChart";
import MeasureCard from "../components/chats/measureCard";
import SelectWeatherStation from "../components/selectWeatherStation";
import ConvertDataToJson from "../services/convertData";
import { useWeatherStation } from "./weatherStationProvider";
import HeatMapByMonth from "../components/chats/heatMap/heatMapByMonth";
import HeatMapByYear from "../components/chats/heatMap/heatMapByYear";
import TemperatureMaxMinProm from "../components/chats/lineChart/temperatureMaxMinProm";

function TemperaturePage() {
    const { selectedStation } = useWeatherStation();
    const { data, loading, error } = ConvertDataToJson();

    // const currentTemperature = [{
    //     "prom": data[0].ts,
    //     "max":data[0].tmax,
    //     "min":data[0].tmin,
    // }]



    return (
        <section className="p-10">
            <article className="grid grid-cols-2 gap-10 justify-between w-full">
                <div>
                    <h2 className="text-white"> {!loading && !error && data.length > 0 ? typeof(data[0].fecha) : 'Cargando...'}</h2>
                    <h1 className="text-title-blue text-2xl">{selectedStation}</h1>
                </div>
                <div>
                    <h1>Estación:</h1>
                    <SelectWeatherStation />
                </div>
            </article>
            <h1 className="text-3xl text-center text-title-blue py-5">Temperatura</h1>
            {(!loading && !error) &&
                <article className="grid grid-cols-3 gap-5 ">
                    <MeasureCard title={"Promedio"} value={data[0].ts} unit={"°C"} />
                    <MeasureCard title={"Maxima"} value={data[0].tmax} unit={"°C"} />
                    <MeasureCard title={"Minima"} value={data[0].tmin} unit={"°C"} />
                </article>
            }
            {(!loading && !error) &&
                <>
                    <div className="grid grid-cols-2 gap-10 py-10">
                        <HeatMapByMonth data={data}/>
                        <HeatMapByYear data={data}/>
                        {/* <HeatMap data={data}/> */}
                    </div>
                    <div>
                        <TemperatureMaxMinProm data={data}/>
                    </div>
                </>
            }
            {/* <CloudinessLineChart/> */}
        </section>
    )
}

export default TemperaturePage;