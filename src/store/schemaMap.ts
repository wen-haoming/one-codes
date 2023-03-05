import { proxy, subscribe } from "valtio";

export type SchemaMap = Record<string, {
  path: string; // 路径
}>;

export const schemaMapState: { schemaMap: SchemaMap } = proxy((JSON.parse(localStorage.getItem('schemaMap') as any)) || { schemaMap: {} });

subscribe(schemaMapState, () => {
  localStorage.setItem('schemaMap', JSON.stringify(schemaMapState))
})
