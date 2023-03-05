import { createId } from "./getId";

export const jsxProps2JsxEle = (props: Record<string, any>) => {

  for (let key in props) {
    if (typeof props[key] === 'object' && props[key].type === 'jsx') {
      const jsxEle = props[key].value;
      const id = createId();
      props[key] = `[{{<div style={{minHeight:50}} componentid={'${id}'}>${jsxEle}</div>}}]`
    } else if (typeof props[key] === 'object' && props[key].type !== 'jsx') {
      props[key] = jsxProps2JsxEle(props[key])
    } else {
      props[key] = props[key]
    }
  }
  return props
}

// {
//   type: "jsx"
//   children:'jsx'
// }
