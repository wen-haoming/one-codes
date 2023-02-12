import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import Layout from './layout';

const defaultData = {
  borderRadius: 4,
  colorPrimary: '#2558fb',
};

function OneCodes() {

  return (
    <ConfigProvider locale={zhCN} theme={{
      token: { colorPrimary: defaultData.colorPrimary, borderRadius: defaultData.borderRadius },
      components:{
        Segmented:{
          colorText:defaultData.colorPrimary,
          borderRadius:0,
          borderRadiusOuter:0
        }
      }
    }}>
      <Layout />
    </ConfigProvider>
  );
}

export default OneCodes;
