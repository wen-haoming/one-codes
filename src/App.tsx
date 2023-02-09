import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { useEffect } from 'react';
import Layout from './layout';
import { Install, globalProps } from '@/store'

const defaultData = {
  borderRadius: 4,
  colorPrimary: '#2558fb',
};

function OneCodes(props: {
  install: Install
}) {

  useEffect(() => {
    globalProps.install = props.install
  }, [])

  return (
    <ConfigProvider theme={{
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
