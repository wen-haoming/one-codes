import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { useEffect } from 'react';
import Layout from './layout';
import { JSONProps } from './layout/LeftPanel/JSONView';
import { dependencyConfigState } from './store';

const defaultData = {
  borderRadius: 4,
  colorPrimary: '#2558fb',
};

type DependencyItem = {
  libraryName: string // 显示的模块名称
  libraryGlobalImport?: string; // 模块引入名
  libraryUrl: string; // 模块 url
  libraryVersion: string; // 模块 版本
  linkUrl?: string[]; // 样式文件
  moduleConfig?: { // 组件类别
    moduleName: string;
    isSlot: boolean;
    defaultProps?: JSONProps[]
  }[]
}

export type DependencyConfig = DependencyItem[]

function OneCodes(props: {
  dependencyConfig: DependencyConfig
}) {

  const { dependencyConfig = [] } = props;

  useEffect(() => {
    dependencyConfigState.dependencyConfigState = dependencyConfig;
  }, [])

  return (
    <ConfigProvider locale={zhCN}
    theme={{
      token: { colorPrimary: defaultData.colorPrimary, borderRadius: defaultData.borderRadius },
      components: {
        Segmented: {
          colorText: defaultData.colorPrimary,
          borderRadius: 0,
          borderRadiusOuter: 0
        }
      }
    }}>
      <Layout />
    </ConfigProvider>
  );
}

export default OneCodes;
