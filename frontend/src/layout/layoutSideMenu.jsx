import React, { useState } from 'react';
import { IoHomeOutline } from "react-icons/io5";
import { WiDayCloudy } from "react-icons/wi";
import { BsBadge3D } from "react-icons/bs"; 
import { PiBuildingOffice } from "react-icons/pi";
import { Layout, Menu } from 'antd';
import "../assets/style/antDesignCustom.css"
import { Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return { key, icon, children, label, };
}


const menuItems = [
  getItem('Inicio', 'home', <IoHomeOutline size={18}/>),
  getItem('Categorias', 'category', <WiDayCloudy size={22}/>, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Modelos 3D', '3d', <BsBadge3D size={20} />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Sobre nosotros', 'about-us', <PiBuildingOffice size={20}/>),
];

const LayoutSideMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
  
    <Layout theme={"light"} style={{ minHeight: '100vh', backgroundColor: "#303845"}} 
    >
      

      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={250} >
        <div className="demo-logo-vertical" />
          <img src="https://www.ambiente.gob.sv/wp-content/themes/instituciones/img/LOGOMARN-B.png" alt="MARN logo" className='py-5'/>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItems} height={50} style={{marginTop: "15%"}}/>
      </Sider>
      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutSideMenu;