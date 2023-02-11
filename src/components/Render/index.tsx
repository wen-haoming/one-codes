import { depsMap } from "@/store/depsMap";
import { useEffect, useRef } from "react"
import { useSnapshot } from "valtio";
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
  const iframeDocRef = useRef<Document | null>(null)

  useEffect(() => {
    if (!iframeDocRef.current && iframeRef.current?.contentWindow?.document) {
      iframeDocRef.current = iframeRef.current?.contentWindow?.document;
      iframeDocRef.current.documentElement.style.width = '100%'
      iframeDocRef.current.documentElement.style.height = '100%'
    }
  }, [])

  useEffect(() => {
    if (iframeDocRef.current) {
      const dependencys = depsMapSnap.dependency;
      if (dependencys.length) {
        iframeDocRef.current.querySelectorAll('[data-sandbox-script]').forEach(script => {
          script.remove();
        });
        dependencys.forEach((dependency, idx) => {
          const script = document.createElement('script');
          script.setAttribute('data-sandbox-script', dependency.label);
          script.src = dependency.latest;
          iframeDocRef.current?.body.appendChild(script)
        
        })
      }
    }
  }, [depsMapSnap.dependency])

  return <iframe srcDoc={srcDocText} sandbox={sandboxAttr} ref={iframeRef} className="border-none w-100% h-100%"></iframe>
}

export default Render
