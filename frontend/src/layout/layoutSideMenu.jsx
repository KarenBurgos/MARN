import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { IoHomeOutline } from 'react-icons/io5';
import { WiDayCloudy } from 'react-icons/wi';
import { BsBadge3D } from 'react-icons/bs';
import { PiBuildingOffice } from 'react-icons/pi';
import { Outlet, useNavigate } from 'react-router-dom';
import { WeatherStationProvider } from '../pages/weatherStationProvider';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}

const menuItems = [
  getItem('Inicio', 'home', <IoHomeOutline size={18} />),
  getItem('Categorias', 'category', <WiDayCloudy size={22} />, [
    getItem('Temperatura', 'temp'),
    getItem('Humedad y condiciones del aire', 'hum'),
    getItem('Precipitación ', 'precipitation'),
    getItem('viento y visibilidad', 'wind'), 
    getItem('Estado del suelo', 'soil'),
  ]),
  getItem('Modelos 3D', '3d', <BsBadge3D size={20} />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Sobre nosotros', 'about-us', <PiBuildingOffice size={20} />),
];

const LayoutSideMenu = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate(); // Hook para la navegación

  const handleMenuClick = (e) => {
    switch (e.key) {
      case 'home':
        navigate('/');
        break;
      case 'temp':
        navigate('/temperatura');
        break;
      case 'hum':
        navigate('/humedad');
        break;
      case 'precipitation':
        navigate('/precipitacion');
        break;
      case 'wind':
        navigate('/viento');
        break;
      case 'soil'://suelo
        navigate('/soil');
        break;
      case '3d':
        navigate('/3d');
        break;
      case '6':
        navigate('/team1');
        break;
      case '8':
        navigate('/team2');
        break;
      case 'about-us':
        navigate('/about-us');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <WeatherStationProvider>
      <Layout theme={"light"} style={{ minHeight: '100vh', backgroundColor: "#303845" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={250}>
          <div className="demo-logo-vertical" />
          <img src="https://www.ambiente.gob.sv/wp-content/themes/instituciones/img/LOGOMARN-B.png" alt="MARN logo" className='py-5' />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItems} height={50} style={{ marginTop: "15%" }} onClick={handleMenuClick} />
        </Sider>
        <Layout>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </WeatherStationProvider>
  );
};

export default LayoutSideMenu;
