import React from 'react';
import { useWeatherStation } from './weatherStationProvider';
import ConvertDataToJson from '../services/convertData';
import SelectWeatherStation from '../components/selectWeatherStation';
import MeasureCard from '../components/cards/measureCard';
import HeatMapByMonth from '../components/chats/heatMap/heatMapByMonth';
import HeatMapByYear from '../components/chats/heatMap/heatMapByYear';
import TemperatureMaxMinProm from '../components/chats/lineChart/temperatureMaxMinProm';
import DataTable from '../components/tables/dataTable';
import TemperatureTableColumns from '../Data/TableColumns/TemperatureTableColumns';

function TemperaturePage() {
  const { selectedStation } = useWeatherStation();
  const { data, loading, error } = ConvertDataToJson();

  return (
    <section className="p-10">
      <article className="grid grid-cols-2 gap-10 justify-between w-full">
        <div>
          <h2 className="text-white">
            {!loading && !error && data.length > 0 ? data[data.length - 2].fecha : 'Cargando...'}
          </h2>
          <h1 className="text-title-blue text-2xl">{selectedStation}</h1>
        </div>
        <div>
          <h1>Estación:</h1>
          <SelectWeatherStation />
        </div>
      </article>
      <h1 className="text-3xl text-center text-title-blue py-5 ">Temperatura</h1>
      <hr className='pb-5 border-lightblue-active' />
      {(!loading && !error) && (
        <article className="grid grid-cols-3 gap-[5%] ">
          <MeasureCard title={"Promedio"} value={data[0].ts} unit={"°C"} />
          <MeasureCard title={"Maxima"} value={data[0].tmax} unit={"°C"} />
          <MeasureCard title={"Minima"} value={data[0].tmin} unit={"°C"} />
        </article>
      )}
      {(!loading && !error) && (
        <>
          <div>
            <div className="grid grid-cols-1 gap-10 pb-5">
              <div>
                <p className='text-orange-300 text-xl text-center pt-14 pb-3'>Temperatura media por mes</p>
                <HeatMapByMonth data={data} />
              </div>
              <div>
                <p className='text-orange-300 text-xl text-center pt-5 pb-3'>Temperatura media por año</p>
                <HeatMapByYear data={data} />
              </div>
            </div>
          </div>
          <div>
          <p className='text-orange-300 text-xl text-center pt-5 pb-3'>Temperatura máximo, mínimo y promedio por año</p>
            <TemperatureMaxMinProm data={data} />
          </div>
          <hr className='pb-5 border-lightblue-active' />
          <div className="grid grid-cols-1 gap-10 pt-5">
            <h1 className="text-title-blue text-2xl text-center">Tabla de datos</h1>
            <DataTable data={data} columns={TemperatureTableColumns()} />
          </div>
        </>
      )}
    </section>
  );
}

export default TemperaturePage;
