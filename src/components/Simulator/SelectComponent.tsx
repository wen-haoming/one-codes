import { useEffect, useState } from "react";
import { getAttributeNode } from "@/utils";
import { Button, Divider, Popover, Segmented } from 'antd';
import { useSnapshot } from "valtio";
import { schemaMapState } from "@/store";


function SelectComponent() {
  const schemaMapStateSnap = useSnapshot(schemaMapState).schemaMap
  const [postition, setPosition] = useState({ left: 0, width: 0, height: 0, top: 0 })
  const [actionsState, setActionsState] = useState({ componentName: '', })

  useEffect(() => {
    if (!document.getElementById('sanbox-simulator')) return

    const simulatorBody = (document.getElementById('sanbox-simulator') as HTMLIFrameElement)?.contentDocument?.body;

    const mousemove = (e: HTMLElementEventMap['mousemove']) => {
      requestAnimationFrame(() => {
        const targetNode = getAttributeNode(e.target as HTMLElement, 'componentid') as HTMLElement
        const componentid = targetNode.getAttribute('componentid')
        if (targetNode && targetNode.getBoundingClientRect && typeof componentid === 'string') {
          if (targetNode.querySelector('.components-actions')) return
          const { left, top, width, height } = targetNode.getBoundingClientRect();
          setPosition({ left: left - 3, top: top - 3, width: width + 2, height: height + 2 });
          setActionsState({
            componentName: schemaMapStateSnap[componentid].componentName
          })
        }
      })
    }

    simulatorBody?.addEventListener('mousemove', mousemove)
    return () => {
      simulatorBody?.removeEventListener('mousemove', mousemove)
    }
  }, [schemaMapStateSnap])

  return <>
    <div className="components-actions absolute border-1px border-brand-primary border-dashed pointer-events-none p-r-2px  " style={postition} />
    <div className="components-actions rounded-2px absolute bg-brand-primary p-x-5px p-y-3px text-white text-xs" style={{ left: postition.left + 3, top: postition.top + postition.height }}>
      {actionsState.componentName}
    </div>
  </>
}

export default SelectComponent
