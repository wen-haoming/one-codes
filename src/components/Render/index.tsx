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
  const depsMapSnap = useSnapshot(store.depsMap)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const iframeDocRef = useRef<Document | null>(null);
  const [srcdocState, setSrcdocState] = useState(srcDocText)
  const idSchemaSnap = useSnapshot(store.idSchema)
  const schemaMapSnap = useSnapshot(store.schemaMap)
   useSnapshot(store)

  useEffect(() => {
    if (!iframeDocRef.current && iframeRef.current?.contentWindow?.document && iframeRef.current?.contentWindow?.document) {
      iframeDocRef.current = iframeRef.current?.contentWindow?.document;
    }
  }, [])

  useEffect(() => {
    if (depsMapSnap.dependency) {
      const scriptText = depsMapSnap.dependency.map((dependency, idx) => {
        const script = document.createElement('script');
        script.setAttribute('data-sandbox-script', dependency.label);
        script.src = dependency.latest;
        iframeRef.current?.contentWindow?.document?.body?.appendChild(script)
        return `<script data-sandbox-script=${dependency.label}  src="${dependency.latest}"> </script>`
      }).join(`\r`)
      setSrcdocState(srcDocText + scriptText);
    }
  }, [depsMapSnap.dependency])

  useEffect(() => {
    if (depsMapSnap.dependency.length === 0) {
      return
    }

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

      if (componentIsSlot) {
        return `<${componentName} ></${componentName}>`
      }

      return `<${componentName} />`
    }).join('')

    const componentJsx = `
          ${dependModuleMapString}
    
          const App =  () => {
            return  <div>
            ${reactRender}
            </div>
        }

       window.ReactDOM.render(<App />, document.getElementById('root'));
  `
    const str = srcdocState.replace(/(<script type="text\/babel">)([.\s\S]*?)(<\/script>)/g, `$1${componentJsx}$3`);
    setSrcdocState(str)
  }, [idSchemaSnap,schemaMapSnap])

  console.log(idSchemaSnap, 'idSchemaSnap')
  return <iframe srcDoc={srcdocState} sandbox={sandboxAttr} ref={iframeRef} className="border-none w-100% h-100%"></iframe>
}

export default Render
