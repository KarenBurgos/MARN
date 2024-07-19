import React from 'react';
import { Select, Space } from 'antd';
import "../assets/style/antDesignCustom.css"

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const SelectWeatherStation = () => (
  <Space wrap
  style={{
    backgroundColor: "#303845",
    width: '100%',
  }}>
    <Select
      defaultValue="estacion 1"
      style={{
        backgroundColor: "#303845",
        width:"100%"
      }}
      size='medium'
      className='ant-selector-custom'
      dropdownStyle={{ backgroundColor: '#303845' }}
      onChange={handleChange}
      options={[
        {
          value: 'estacion 1',
          label: 'estacion 1',
        },
        {
          value: 'estacion 2',
          label: 'estacion 2',
        },
        {
          value: 'estacion 3',
          label: 'estacion 3',
        },
      ]}
    />
    
  </Space>
);
export default SelectWeatherStation;