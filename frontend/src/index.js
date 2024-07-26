import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LayoutSideMenu from './layout/layoutSideMenu';
import { ConfigProvider, theme } from 'antd';
import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import HomeDashboard from './pages/homeDashboard';
import TemperaturePage from './pages/temperaturePage';
import HumidityPage from './pages/humidityPage';
import PrecipitationPage from './pages/precipitationPage';
import WindPage from './pages/windPage';
import SoilConditionPage from './pages/soilConditionPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutSideMenu />,
    children: [
      {
        path: "/",
        element: <HomeDashboard />,
      },
      {
        path: "/temperatura",
        element: <TemperaturePage />,
      },
      {
        path: "/humedad",
        element: <HumidityPage />,
      },
      {
        path: "/precipitacion",
        element: <PrecipitationPage />,
      },
      {
        path: "/viento",
        element: <WindPage />,
      },
      {
        path: "/soil",
        element: <SoilConditionPage />,
      },
    ],
    
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider
    theme={{
      algorithm: theme.darkAlgorithm,
      components: {
        Menu: {
          darkItemBg: "#303845",
          darkSubMenuItemBg: "#2C333F",
          darkItemSelectedBg: "#567796",
        },
        Layout: {
          siderBg: "#303845",
          triggerBg: "#2C333F",
          bodyBg: "#3C4557"
        },
        Select:{
          selectorBg: "#303845",
          optionSelectedBg:"#3C4557",
        },
        DatePicker: {
          colorTextPlaceholder: '#ffffff', 
          colorPrimary:'#7687a5',
          colorText: '#ffffff', 
          colorBorder: '#7687a5', 
          colorBgElevated: '#58667D', //color del calendario desplegado
          
        },
        Table:{
           headerBg: "#272E38",
            borderColor: "#272E38"
        }
      },
    }}
  >
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
