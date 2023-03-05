import { IdSchema } from "@/store";
import { createId } from "./getId";

export const jsxProps2JsxEle = (props: Record<string, any>, cb: (idSchame: IdSchema) => string) => {
  const newProps = JSON.parse(JSON.stringify(props))
  for (let key in newProps) {

    if (typeof newProps[key] === 'object' && newProps[key].type === 'jsx') {
      const jsxEle = newProps[key].value;
      const id = createId();
      newProps[key] = cb([{
        ...newProps[key],
        id
      }])
    } else if (typeof newProps[key] === 'object' && newProps[key].type !== 'jsx') {
      newProps[key] = jsxProps2JsxEle(props[key],cb)
    } else {
      newProps[key] = newProps[key]
    }
  }

  return newProps
}

const parseProps = (props: Record<string, any>, id: string): null | string => {
  for (let key in props) {
    if (typeof props[key] === 'string' && String(props[key]).match(`componentid='(.*?)'`) && String(props[key]).match(`componentid='(.*?)'`)![1] && String(props[key]).match(`componentid='(.*?)'`)![1] === id) {
      return `['${key}']`
    } else if (typeof props[key] === 'object') {
      return `['${key}']${parseProps(props[key], id)}`
    }
  }
  return null
}

export const getJsxEle = (idSchame: IdSchema, id: string) => {

  for (let key in idSchame) {
    const targetPath = parseProps(idSchame[key].defaultProps || {}, id);
    if (targetPath) {
      return `['${key}']['props']${targetPath}`
    }
    const slot = idSchame[key].slot;
    if (!!slot) {
      return getJsxEle(slot, id)
    }
  }
  return null
}
