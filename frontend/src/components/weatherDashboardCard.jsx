import sunnyDay from "../assets/icons/sunny day.png"
import { CiLocationOn } from "react-icons/ci";
import { PiWindLight } from "react-icons/pi";
import { IoWaterOutline, IoUmbrellaOutline } from "react-icons/io5";
import { useWeatherStation } from "../pages/weatherStationProvider";

function WeatherDashboardCard({data}){
    const { selectedStation } = useWeatherStation();
    const actualWeather = data[0]
    return(
        <div className="bg-primary-dark flex rounded-lg justify-center p-5">
            <div>
                <img src={sunnyDay} alt="estado del clima" className="h-36"/>
                <span className="text-center">
                    <h1>Temperatura</h1>
                    <p className="text-title-blue text-xl">{actualWeather.ts} °C</p>
                    <p>8:00 a.m.</p>
                </span>
            </div>
            <div className="flex flex-col justify-center">
                <h1 className="text-title-blue text-xl pb-5">Estado del clima</h1>
                <div className="grid grid-cols-2 grid-rows-2 gap-5">
                    <span className="flex gap-3">
                        <CiLocationOn size={35} color={"#99CEFF"} />
                        <span className="flex flex-col">
                            <p>
                                Departamento
                            </p>
                            <p>
                                municipio
                            </p>
                        </span>
                    </span>
                    <span className="flex gap-3">
                        <PiWindLight size={35} color={"#99CEFF"}/>
                        <span className="flex flex-col">
                            <p>
                                Viento
                            </p>
                            <p className="text-xl">
                                {actualWeather.sa} km/h
                            </p>
                        </span>
                    </span>
                    <span className="flex gap-3">
                        <IoWaterOutline size={35} color={"#99CEFF"}/>
                        <span className="flex flex-col">
                            <p>
                                Humedad
                            </p>
                            <p className="text-xl">
                                {actualWeather.hr} %
                            </p>
                        </span>
                    </span>
                    <span className="flex gap-3">
                        <IoUmbrellaOutline size={35} color={"#99CEFF"}/>
                        <span className="flex flex-col">
                            <p>
                                Precipitación
                            </p>
                            <p className="text-xl">
                                {actualWeather.pd} mm
                            </p>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default WeatherDashboardCard;