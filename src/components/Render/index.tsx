import { store } from "@/store";
import { useEffect, useMemo, useRef, useState } from "react"
import { ref, useSnapshot } from "valtio";
import srcDocText from './srcdoc.html?raw';

const sandboxAttr = [
  'allow-forms',
  'allow-modals',
  'allow-pointer-lock',
  'allow-popups',
  'allow-same-origin',
  'allow-scripts',
  'allow-top-navigation-by-user-activation'
].join(' ')

function Render() {
  const depsMapSnap = useSnapshot(store).dependencyConfig
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const iframeDocRef = useRef<Document | null>(null);
  const [srcdocState, setSrcdocState] = useState(srcDocText)
  const idSchemaSnap = useSnapshot(store).idSchema
  const schemaMapSnap = useSnapshot(store).schemaMap

  useEffect(() => {
    if (!iframeDocRef.current && iframeRef.current?.contentWindow?.document && iframeRef.current?.contentWindow?.document) {
      iframeDocRef.current = iframeRef.current?.contentWindow?.document;
    }
  }, [])

  useEffect(() => {
    if (depsMapSnap.length === 0) {
      return
    }

    const scriptText = depsMapSnap.map((dependency, idx) => {
      return `<script data-sandbox-script=${dependency.libraryName}  src="${dependency.libraryUrl}"> </script>`
    }).join(`\r`)

    const getDependModuleMap = Object.values(schemaMapSnap).reduce<Record<string, string[]>>((pre, value) => {
      if (pre[value.libraryName]) {
        pre[value.libraryName] = [...new Set([...pre[value.libraryName], value.componentName])]
      } else {
        pre[value.libraryName] = [value.componentName]
      }
      return pre
    }, {})
    const dependModuleMapString = Object.entries(getDependModuleMap).map(([libraryName, componentName]) => {
      return `const { ${componentName.join(',')} } = ${libraryName};`
    }).join(`\n`)

    const reactRender = idSchemaSnap.map((idSchemaItem) => {
      const id = idSchemaItem.id;
      const slot = idSchemaItem.slot;
      const componentName = schemaMapSnap[id].componentName
      const componentConfigProps = schemaMapSnap[id].configProps
      const componentIsSlot = schemaMapSnap[id].isSlot
      const componentLibraryName = schemaMapSnap[id].libraryName
      const componentPath = schemaMapSnap[id].path
      const componentProps = schemaMapSnap[id].props || {};

      const defaultProps = (schemaMapSnap[id].defaultProps || []).reduce<Record<string,any>>((pre,cur)=>{
        if(cur.propsName){
          pre[cur.propsName] = cur.propsValue
        }
        return pre
      },{});

      if (componentIsSlot) {
        return `<${componentName} {...${JSON.stringify(defaultProps)}}></${componentName}>`
      }

      return `<${componentName} {...${JSON.stringify(defaultProps)}} />`
    }).join('')
console.log(dependModuleMapString,'dependModuleMapString')
    const componentJsx = `
          ${dependModuleMapString}
          const App =  () => {
            return  <div>
            ${reactRender}
            </div>
        }
       window.ReactDOM.render(<App />, document.getElementById('root'));
  `
    const str = srcdocState.replace(/(<script type="text\/babel">)([.\s\S]*?)(<\/script>)/g, `$1${componentJsx}$3`)
                .replace('<!-- scripts -->',scriptText)
  
    setSrcdocState(str)
  }, [idSchemaSnap,schemaMapSnap])


  return <iframe srcDoc={srcdocState} sandbox={sandboxAttr} ref={iframeRef} className="border-none w-100% h-100%"></iframe>
}

export default Render
