import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LayoutSideMenu from './layout/layoutSideMenu';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root'));
<ConfigProvider
      theme={{
        components: {
          Layout: {
            siderBg:
              "linear-gradient(145deg, rgba(255,68,145,1) 0%, rgba(244,141,1,1) 100%)",
          },
        },
      }}
    ></ConfigProvider>
root.render(
  <React.StrictMode>
    <LayoutSideMenu />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
