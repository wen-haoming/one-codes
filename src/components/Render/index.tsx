import { idSchema, schemaMap } from "@/store";
import { depsMap } from "@/store/depsMap";
import { useEffect, useRef, useState } from "react"
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
  const depsMapSnap = useSnapshot(depsMap)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const iframeDocRef = useRef<Document | null>(null);
  const [srcdocState, setSrcdocState] = useState(srcDocText)
  const idSchemaSnap = useSnapshot(idSchema)
  const schemaMapSnap = useSnapshot(schemaMap)

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
      setSrcdocState(srcDocText+scriptText);
    }
  }, [depsMapSnap.dependency])

  useEffect(()=>{
    console.log(ref(idSchemaSnap))
    console.log(ref(schemaMapSnap))
  },[idSchemaSnap])

  return <iframe srcDoc={srcdocState} sandbox={sandboxAttr} ref={iframeRef} className="border-none w-100% h-100%"></iframe>
}

export default Render
