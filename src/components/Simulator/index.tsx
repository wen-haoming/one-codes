import { currentState, dependencyConfigState, idSchemaState, schemaMapState } from "@/store";
import { Spin } from "antd";
import { useEffect, useRef, useState } from "react"
import { useSnapshot } from "valtio";
import srcDocText from './srcdoc.html?raw';
import schemaTransform from "./schemaTransform";
import { LoadingOutlined } from '@ant-design/icons';
import SelectComponent from './SelectComponent'

const sandboxAttr = [
  'allow-forms',
  'allow-modals',
  'allow-pointer-lock',
  'allow-popups',
  'allow-same-origin',
  'allow-scripts',
  'allow-top-navigation-by-user-activation'
].join(' ')

function Simulator() {
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
      iframeRef.current.style.width = wrapper.current?.clientWidth + 'px';
      iframeRef.current.style.height = wrapper.current?.clientHeight + 'px';
    }
  }, [])

  useEffect(() => {
    const scriptText = depsMapSnap.map((dependency, idx) => {
      return `<script data-sandbox-script=${dependency.libraryName}  src="${dependency.libraryUrl}"> </script>`
    }).join(`\r`)

    const linkText = depsMapSnap.map((dependency, idx) => {
      return dependency.linkUrl?.map(href => ` <link rel="stylesheet" href="${href}"></link>`).join('\n')
    }).join('\n')

    const str = srcdocState
      .replace('<!-- scripts -->', scriptText)
      .replace(`<!-- links -->`, linkText)
    setFrameLoading(true)
    setSrcdocState(str)
  }, [depsMapSnap])

  useEffect(() => {
    if (frameLoading) return
    schemaTransform(JSON.parse(JSON.stringify({
      schemaMapStateSnap: schemaMapSnap,
      idSchemaStateSnap: idSchemaSnap
    }))).then(({ umdCode, esCode }) => {
      const scriptTag = document.createElement('script');
      scriptTag.id = 'render-jsx'
      if (scriptTag && iframeRef.current?.contentDocument?.body?.appendChild) {
        scriptTag.innerHTML = umdCode;
        currentState.code = esCode
        iframeRef.current?.contentDocument?.body?.querySelector('#render-jsx')?.remove();
        iframeRef.current?.contentDocument?.body?.appendChild(scriptTag)
      }
    })
  }, [idSchemaSnap, schemaMapSnap, frameLoading])

  return <div className="border-none w-100% h-100% relative flex" ref={wrapper}>
    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} spinning={frameLoading} tip={`?????????????????? `+ depsMapSnap.map(deps => deps.libraryName).join('???') + " ????????? ..."}>
      <iframe
        id="sanbox-simulator"
        className="border-none  relative"
        srcDoc={srcdocState}
        sandbox={sandboxAttr}
        ref={iframeRef}
        onError={() => {
          setFrameLoading(false)
        }}
        onLoad={() => {
          setFrameLoading(false)
        }}
      >
      </iframe>
    </Spin>
    {!frameLoading && <SelectComponent />}
  </div>
}

export default Simulator
