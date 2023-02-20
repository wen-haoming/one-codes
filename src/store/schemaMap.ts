import { ModuleProps } from "@/App";
import { JSONProps } from "@/layout/LeftPanel/JSONView";
import { proxy, subscribe } from "valtio";

export type UiItem = {
  formPropsConfig?: ModuleProps
  componentName: string; // 组件名称
  configProps?: any[]; // 右侧面板配置项
  path: string; // 路径
  libraryName: string; // umd 包全局的名称
  libraryGlobalImport:string;
  isSlot?: boolean; //是否支持组件嵌套
  defaultProps?: Record<string, any>
  props?:Record<string,any>
};

export type SchemaMap = Record<string, UiItem>;

export const schemaMapState: { schemaMap: SchemaMap } = proxy((JSON.parse(localStorage.getItem('schemaMap') as any)) || { schemaMap: {} });

subscribe(schemaMapState, () => {
  localStorage.setItem('schemaMap', JSON.stringify(schemaMapState))
})
