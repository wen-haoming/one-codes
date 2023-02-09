import { useRef } from "react"
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

  const iframeRef = useRef<HTMLIFrameElement>(null)

  
  return <iframe srcDoc={srcDocText} sandbox={sandboxAttr} ref={iframeRef} className="border-none w-100% h-100%"></iframe>
}

export default Render
