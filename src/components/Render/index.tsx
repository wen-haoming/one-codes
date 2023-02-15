import { dependencyConfigState, idSchemaState, schemaMapState } from "@/store";
import { Spin } from "antd";
import { useEffect, useRef, useState } from "react"
import { ref, useSnapshot } from "valtio";
import srcDocText from './srcdoc.html?raw';
import * as babel from '@babel/standalone'


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
  const depsMapSnap = useSnapshot(dependencyConfigState).dependencyConfigState
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const iframeDocRef = useRef<Document | null>(null);
  const [srcdocState, setSrcdocState] = useState(srcDocText)
  const idSchemaSnap = useSnapshot(idSchemaState).idSchema
  const schemaMapSnap = useSnapshot(schemaMapState).schemaMap
  const [frameLoading, setFrameLoading] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!iframeDocRef.current && iframeRef.current?.contentWindow?.document && iframeRef.current?.contentWindow?.document) {
      iframeDocRef.current = iframeRef.current?.contentWindow?.document;
      iframeRef.current.style.width = wrapper.current?.clientWidth + 'px'
      iframeRef.current.style.height = wrapper.current?.clientHeight + 'px'
    }
  }, [])

  useEffect(() => {
    if (depsMapSnap.length === 0 && frameLoading) {
      return
    }

    const reactRender = idSchemaSnap.map((idSchemaItem) => {
      const id = idSchemaItem.id;
      const componentName = schemaMapSnap[id].componentName
      const componentIsSlot = schemaMapSnap[id].isSlot
      const componentLibraryName = schemaMapSnap[id].libraryName

      const defaultProps = ((schemaMapSnap[id].defaultProps || [])).reduce<Record<string, any>>((pre, cur) => {
        if (cur && cur.propsName) {
          pre[cur.propsName] = cur.propsValue
        }
        return pre
      }, ref({}));

      if (componentIsSlot) {
        return `<window.${componentLibraryName}.${componentName} {...${JSON.stringify(defaultProps)}}></window.${componentLibraryName}.${componentName}>`
      }

      return `<window.${componentLibraryName}.${componentName} {...${JSON.stringify(defaultProps)}} />`
    }).join('')

    const componentJsx = `
          var App =  () => {
            return  <>
            ${reactRender}
            </>
        }
       window.ReactDOM.render(<App />, document.getElementById('root'));
  ` 
    const scriptTag = document.createElement('script');
    scriptTag.id = 'render-jsx'

    if (scriptTag&&iframeRef.current?.contentDocument?.body?.appendChild) {
      console.log(babel)
      scriptTag.innerHTML = babel.transform(componentJsx,{presets: ["react"]}).code;
      iframeRef.current?.contentDocument?.body?.querySelector('#render-jsx')?.remove();
      iframeRef.current?.contentDocument?.body?.appendChild(scriptTag)
    }
  }, [idSchemaSnap, schemaMapSnap, frameLoading])

  useEffect(() => {
    if (depsMapSnap.length === 0) {
      return
    }

    const scriptText = depsMapSnap.map((dependency, idx) => {
      return `<script data-sandbox-script=${dependency.libraryName}  src="${dependency.libraryUrl}"> </script>`
    }).join(`\r`)
    const linkText = depsMapSnap.map((dependency, idx) => {
      return dependency.linkUrl?.map(href => ` <link rel="stylesheet" href="${href}"></link>`).join('\n')
    }).join('\n')

    const getDependModuleMap = Object.values(schemaMapSnap).reduce<Record<string, string[]>>((pre, value) => {
      if (pre[value.libraryName]) {
        pre[value.libraryName] = [...new Set([...pre[value.libraryName], value.componentName])]
      } else {
        pre[value.libraryName] = [value.componentName]
      }
      return pre
    }, {})

    const str = srcdocState
      .replace('<!-- scripts -->', scriptText)
      .replace(`<!-- links -->`, linkText)
    setFrameLoading(true)
    setSrcdocState(str)
  }, [])

  return <div className="border-none w-100% h-100% relative flex" ref={wrapper}>
    <Spin spinning={frameLoading}>
      <iframe onLoad={() => {
        setFrameLoading(false)
      }} srcDoc={srcdocState} sandbox={sandboxAttr} ref={iframeRef} className="border-none ">
      </iframe>
    </Spin>
  </div>
}

export default Render
