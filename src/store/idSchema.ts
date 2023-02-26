import { createId } from "@/utils";
import { proxy, subscribe } from "valtio";
import { currentState } from "./currentState";
import { schemaMapState } from "./schemaMap";
import get from 'lodash.get'

export type IdSchema = {
  id: string;
  slot?: {
    id: string;
  }[];
}[];

export const idSchemaState: { idSchema: IdSchema } = proxy((JSON.parse(localStorage.getItem('idSchema') as any)) || { idSchema: [] });

subscribe(idSchemaState, () => {
  localStorage.setItem('idSchema', JSON.stringify(idSchemaState))
})

export const delSchema = (id: string) => {
  const searchId: any = (idSchema2: IdSchema) => {
    return idSchema2.find((schema, idx) => {
      if (schema.id === id) {
        idSchema2.splice(idx, 1);
        return true
      } else if (schema.slot) {
        return searchId(schema.slot)
      }
      return false
    })
  }
  searchId(idSchemaState.idSchema)
  delete schemaMapState.schemaMap[id]
  currentState.id = ''
}


export const addSchema = (type: 'unshift' | 'shift' | 'insert', schemaId?: string) => {
  let path = '';

  if (schemaId) {
    const id = createId();
    const target = get(idSchemaState.idSchema, schemaMapState.schemaMap[schemaId].path);

    const searchId:any = (idSchemaList: IdSchema, targetId: string) => {
      for (const index in idSchemaList) {
        if (idSchemaList[index].id === targetId) {
          return {
            list: idSchemaList,
            index
          }
        } else if (idSchemaList[index].slot) {
          return searchId(idSchemaList[index].slot,targetId)
        }
      }
      return {
        list: [],
        index: null
      }
    }

    if (target && type === 'insert') {
      // 插入子元素
      target.slot.push({
        id,
      });
    } else if (target && type === "unshift") {
      // 往上增加
      const obj = searchId(idSchemaState.idSchema, schemaId)
      console.log(obj, '==')
    } else if (target && type === "shift") {
      //  往下新增
      const obj = searchId(idSchemaState.idSchema, schemaId)
      console.log(obj, '==')
    }
  }
}
