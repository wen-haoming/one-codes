import { proxy, subscribe } from "valtio";

export type IdSchema = {
  id: string;
  slot?: {
    id: string;
  }[];
}[];

export const idSchemaState:{idSchema:IdSchema} = proxy((JSON.parse(localStorage.getItem('idSchema') as any))||{idSchema: []});

subscribe(idSchemaState, () => {
  localStorage.setItem('idSchema', JSON.stringify(idSchemaState))
})
