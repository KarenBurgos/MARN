import React from 'react';
import { Table } from 'antd';
import "../../assets/style/antDesignCustom.css"

const beaufortColors = [
  '#00BFFF', // Calma
  '#87CEEB', // Ventolina
  '#32CD32', // Brisa ligera
  '#FFD700', // Brisa suave
  '#FF8C00', // Brisa moderada
  '#FF4500', // Brisa fresca
  '#FF6347', // Brisa fuerte
  '#FF1493', // Viento fuerte
  '#FF00FF', // Temporal fuerte
  '#8A2BE2', // Temporal duro
  '#4B0082', // Tempestad
  '#6A5ACD', // Tormenta
  '#8B0000'  // Huracán
];

const data = [
  { key: 0, valor: '0', vel: '0 a 1', denominacion: 'Calma', efectos: 'Calma, el humo asciende en forma vertical casi sin perturbaciones' },
  { key: 1, valor: '1', vel: '2 a 5', denominacion: 'Ventolina', efectos: 'El humo se desplaza perceptiblemente con el viento' },
  { key: 2, valor: '2', vel: '6 a 11', denominacion: 'Flojito', efectos: 'Se mueven las hojas de los árboles, empiezan a moverse los molinos' },
  { key: 3, valor: '3', vel: '12 a 19', denominacion: 'Flojo', efectos: 'Se agitan las hojas, ondulan las banderas' },
  { key: 4, valor: '4', vel: '20 a 28', denominacion: 'Bonancible', efectos: 'Se levanta polvo y papeles, se agitan las copas de los árboles' },
  { key: 5, valor: '5', vel: '29 a 38', denominacion: 'Fresquito', efectos: 'Pequeños movimientos de los árboles, superficie de los lagos ondulada' },
  { key: 6, valor: '6', vel: '39 a 49', denominacion: 'Fresco', efectos: 'Se mueven las ramas de los árboles' },
  { key: 7, valor: '7', vel: '50 a 61', denominacion: 'Frescachón', efectos: 'Se mueven los árboles grandes, dificultad para caminar contra el viento' },
  { key: 8, valor: '8', vel: '62 a 74', denominacion: 'Temporal', efectos: 'Se quiebran las copas de los árboles, circulación de personas difícil' },
  { key: 9, valor: '9', vel: '75 a 88', denominacion: 'Temporal fuerte', efectos: 'Daños en árboles, imposible caminar contra el viento' },
  { key: 10, valor: '10', vel: '89 a 102', denominacion: 'Temporal duro', efectos: 'Árboles arrancados, daños en la estructura de las construcciones' },
  { key: 11, valor: '11', vel: '103 a 117', denominacion: 'Temporal muy duro', efectos: 'Estragos abundantes en construcciones y árboles' },
  { key: 12, valor: '12', vel: '118 o más', denominacion: 'Temporal huracanado', efectos: 'Destrucción casi total de edificios' }
];

const columns = [
  {
    title: 'Valor',
    dataIndex: 'valor',
    key: 'valor',
    render: (text, record) => (
      <div style={{ backgroundColor: beaufortColors[record.key], color: '#fff', padding: '5px', borderRadius: '4px', textAlign: 'center' }}>
        {text}
      </div>
    )
  },
  {
    title: 'Vel. (km/h)',
    dataIndex: 'vel',
    key: 'vel'
  },
  {
    title: 'Denominación',
    dataIndex: 'denominacion',
    key: 'denominacion'
  },
  {
    title: 'Efectos en tierra',
    dataIndex: 'efectos',
    key: 'efectos'
  }
];

const BeaufortTable = () => {
  return (
    <div>
        <p className='text-xl pt-5 pb-3'>Escala de Beaufort</p>
        <Table dataSource={data} columns={columns} pagination={false} />
    </div>

  );
};

export default BeaufortTable;
