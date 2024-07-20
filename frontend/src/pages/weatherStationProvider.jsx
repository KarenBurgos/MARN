import React, { createContext, useContext, useState } from 'react';

const WeatherStationContext = createContext();

export const WeatherStationProvider = ({ children }) => {
  const [selectedStation, setSelectedStation] = useState('San Andres');

  return (
    <WeatherStationContext.Provider value={{ selectedStation, setSelectedStation }}>
      {children}
    </WeatherStationContext.Provider>
  );
};

export const useWeatherStation = () => useContext(WeatherStationContext);

