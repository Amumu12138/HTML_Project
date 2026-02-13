import React from 'react';
import { ConfigProvider, Button, Space, DatePicker, version, theme } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/locale/zh_CN';
// 引入图标
import { LayoutTwoTone, WechatOutlined } from "@ant-design/icons"

const App = () => (
  <ConfigProvider
    locale={zhCN}
    theme={{
      // 1. 单独使用暗色算法
      algorithm: theme.darkAlgorithm,
      // 2. 组合使用暗色算法与紧凑算法
      // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
      token: {
        // Seed Token，影响范围大
        colorPrimary: 'red',
        // borderRadius: 2,
        // 派生变量，影响范围小
        // colorBgContainer: '#f6ffed',
      },
    }}
  >
    <div style={{ padding: '0 24px' }}>
      <h1>antd version: {version}</h1>
      <Space>
        <DatePicker />
        <Button type="primary">Primary Button</Button>
      </Space>
      <br />
      <Space>
        <LayoutTwoTone />
        <WechatOutlined />
      </Space>
    </div>
  </ConfigProvider>

);

export default App;