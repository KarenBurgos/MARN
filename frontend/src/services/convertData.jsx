import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { useWeatherStation } from '../pages/weatherStationProvider';
import SanAndresData from "../Data/SanAndres.csv";
import SantiagoMariaData from "../Data/SantiagoMaria.csv";
import NuevaConcepcionData from "../Data/NuevaConcepcion.csv"
import MontecristoData from "../Data/Montecristo.csv"
import dayjs from 'dayjs';

const ConvertDataToJson = () => {
  const { selectedStation } = useWeatherStation();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URLs de los archivos CSV
  const csvUrls = [
    SanAndresData,
    SantiagoMariaData,
    NuevaConcepcionData,
    MontecristoData
  ];

  // Mapeo de los nombres descriptivos a las claves en `data`
  const stationMapping = {
    'San Andres': 'stationSanAndres',
    'Santiago de Maria': 'stationSantiagoMaria',
    'Nueva Concepcion': 'stationNuevaConcepcion',
    'Monte Cristo': 'stationMonteCristo'
  };

  // Función para convertir CSV a JSON
  const fetchCsvData = async (url, key) => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.text())
        .then(csvText => {
          Papa.parse(csvText, {
            header: true,
            dynamicTyping: true,
            complete: results => {
              const cleanedData = results.data.map(item => ({
                ...item,
                rd07: item.rd07?.trim(),
                rd14: item.rd14?.trim(),
                rd21: item.rd21?.trim(),
                rd: item.rd?.trim(),
              }));
              resolve({ key, data: cleanedData });
            },
            error: err => reject(err),
          });
        })
        .catch(err => reject(err));
    });
  };

  // Función para ordenar datos por fecha
  const sortDataByDate = (data) => {
    return data.sort((a, b) => {
      const dateA = dayjs(a.fecha);
      const dateB = dayjs(b.fecha);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    });
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        // Convertir cada archivo CSV en JSON con nombres descriptivos para las claves
        const dataEntries = await Promise.all(
          csvUrls.map((url, index) => {
            const key = `station${['SanAndres', 'SantiagoMaria', 'NuevaConcepcion', 'MonteCristo'][index]}`;
            return fetchCsvData(url, key);
          })
        );

        // Convertir el array de datos a un objeto con claves descriptivas
        const dataMap = dataEntries.reduce((acc, { key, data }) => {
          acc[key] = sortDataByDate(data); // Ordenar los datos por fecha antes de guardarlos
          return acc;
        }, {});

        setData(dataMap);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Obtener la clave correcta basándote en el mapeo
  const stationKey = stationMapping[selectedStation] || 'stationSanAndres';
  const stationData = data[stationKey] || [];

  return { data: stationData, loading, error };
};

export default ConvertDataToJson;
