import { proxy } from 'valtio';

export type UiItem = {
  props: Record<string, any> | null;
  componentName: string; // 组件名称
  configProps?: any[]; // 右侧面板配置项
  path:string;
  isSlot?:boolean;
};

export type SchemaMap = Record<string, UiItem>;

export const schemaMap = proxy<SchemaMap>({
});
