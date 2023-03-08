import { schemaMapState } from "@/store";
import { ref } from "valtio";
import { createId } from "./getId";

export const jsxProps2JsxEle = (props: Record<string, any>, path: string[]) => {
  const newProps = JSON.parse(JSON.stringify(props))
  for (let key in newProps) {
    if (typeof newProps[key] === 'object' && newProps[key].type === 'jsx') {
      const jsxEle = newProps[key].value;
      const pathId = JSON.stringify(path.concat(key))

      if (!schemaMapState.schemaMap[pathId]) {
        schemaMapState.schemaMap[pathId] = ref({
          componentName: 'div',
          path: pathId,
          isSlot: true
        })
      }
      newProps[key] = `[{{<div style={{minHeight:50}} componentid={'${pathId}'}>${jsxEle}</div>}}]`
    } else if (typeof newProps[key] === 'object' && newProps[key].type !== 'jsx') {
      newProps[key] = jsxProps2JsxEle(props[key], path.concat(key))
    } else {
      newProps[key] = newProps[key]
    }
  }
  return newProps
}
