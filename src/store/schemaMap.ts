export type UiItem = {
  props: Record<string, any> | null;
  componentName: string; // 组件名称
  configProps?: any[]; // 右侧面板配置项
  path: string; // 路径
  libraryName:string;
  isSlot?: boolean; //是否支持组件嵌套
};

export type SchemaMap = Record<string, UiItem>;

export const schemaMap:SchemaMap = ({});
