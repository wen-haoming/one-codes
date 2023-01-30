import { ConfigProvider } from 'antd';
import 'antd/dist/antd.compact.less'; // 引入官方提供的紧凑 less 样式入口文件
import zhCN from 'antd/es/locale/zh_CN';
import { useEffect } from 'react';
import Layout from './Layout';
import { useSnapshot } from 'valtio'
import { Install, globalProps } from '@/store'

function OneCodes(props: {
  install: Install
}) {

  useEffect(() => {
    globalProps.install = props.install
  }, [])

  return (
    <ConfigProvider locale={zhCN} prefixCls="one-codes">
      <Layout />
    </ConfigProvider>
  );
}

export default OneCodes;
