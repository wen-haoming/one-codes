import { proxy, ref } from 'valtio';

export type UiItem = {
  props: Record<string, any> | null;
  componentName: string; // 组件名称
  component: any; // 组件
  configProps?: any[]; // 右侧面板配置项
  path:string;
};

export type SchemaMap = Record<string, UiItem>;

export const schemaMap = proxy<SchemaMap>({
});
