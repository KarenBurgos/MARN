import { useNavigate } from "react-router-dom";
import WeatherDashboardCard from "../components/weatherDashboardCard";
import SelectWeatherStation from "../components/selectWeatherStation";


function HomeDashboard(){
    const navigate = useNavigate();
    return(
        <section className="p-10">
        <section className="grid grid-cols-2 gap-10">
            <article>
                <h2 className="text-white">Lunes 17 de julio 2024</h2>
                <h1 className="text-title-blue text-2xl"> Nombre estación</h1>

                <WeatherDashboardCard />
            </article>
            <article >
                <SelectWeatherStation />
                <h1>Hola</h1>
            </article>
        </section>
            
        </section>
    )
}

export default HomeDashboard;