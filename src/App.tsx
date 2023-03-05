import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { CSSProperties, useEffect } from 'react';
import Layout from './layout';
import { JSONProps } from './layout/LeftPanel/JSONView';
import { currentState, dependencyConfigState } from './store';
import 'uno.css';
import { useSnapshot } from 'valtio';

const defaultData = {
  borderRadius: 4,
  colorPrimary: '#2558fb',
};


export type JsxType = 'jsx' | '[]jsx' | 'fnToJsx'
export type ModulePropsTypeVal = 'string' | 'boolean' | 'number' | 'valueEnum' | 'options' | JsxType

export type ModuleProps = Record<string, {
  type: ModulePropsTypeVal
  title: string;
  componentProps?: Record<string, any>
}>

export type DependencyItem = {
  libraryName: string // 显示的模块名称
  libraryGlobalImport?: string; // 模块引入名
  libraryUrl: string; // 模块 url
  libraryVersion: string; // 模块 版本
  linkUrl?: string[]; // 样式文件
  moduleConfig?: ModuleConfig[]
}

export type ModuleConfig = { // 组件类别
  moduleName: string;
  isSlot?: boolean;
  formPropsConfig?: ModuleProps
  defaultProps?: Record<string, any>
}

export type DependencyConfig = DependencyItem[]

function OneCodes(props: {
  dependencyConfig: DependencyConfig
  style?: CSSProperties
}) {
  const { dependencyConfig = [], style } = props;
  const currentTheme = useSnapshot(currentState).theme;

  useEffect(() => {
    dependencyConfigState.dependencyConfigState = dependencyConfig;
  }, [])

  return (
    <ConfigProvider locale={zhCN}
      theme={{
        algorithm: currentTheme === 'light' ? undefined : theme.darkAlgorithm,
      }}>
      <Layout style={style} />
    </ConfigProvider>
  );
}

export default OneCodes;
