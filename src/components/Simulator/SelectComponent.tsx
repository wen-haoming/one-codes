import { useEffect, useRef, useState } from "react";
import { getAttributeNode } from "@/utils";
import { useSnapshot } from "valtio";
import { currentState, delSchema, IdSchema, idSchemaState, schemaMapState } from "@/store";
import { Space, Tooltip } from "antd";
import { DeleteOutlined, PlusSquareOutlined } from "@ant-design/icons";
import AddWidget from "../AddWidget";

function SelectComponent() {
  const schemaMapStateSnap = useSnapshot(schemaMapState).schemaMap;
  const currentStateSnap = useSnapshot(currentState);
  const [postition, setPosition] = useState({ left: 0, width: 0, height: 0, top: 0 })
  const [selectPostition, setSelectPosition] = useState({ left: 0, width: 0, height: 0, top: 0 })
  const [actionsState, setActionsState] = useState<{ componentName: string, componentid: string, isSlot: boolean | undefined }>({ componentName: '', componentid: '', isSlot: undefined });
  const [show, setShow] = useState(false)

  const getTargetComponent = (ele: HTMLElement) => {
    const targetNode = getAttributeNode(ele, 'componentid') as HTMLElement
    const componentid = targetNode && targetNode?.getAttribute && targetNode.getAttribute('componentid')
    if (targetNode && targetNode.getBoundingClientRect && typeof componentid === 'string') {
      setShow(true)
      if (targetNode.querySelector('.components-actions')) return
      const { left, top, width, height } = targetNode.getBoundingClientRect();
      setPosition({ left: left - 3, top: top - 3, width: width + 2, height: height + 2 });
      setActionsState({
        componentName: schemaMapStateSnap[componentid].componentName,
        componentid,
        isSlot: schemaMapStateSnap[componentid].isSlot
      })
      return {
        targetNode,
        left, top, width, height
      }
    } else {
      setShow(false)
      return {}
    }
  }

  const mousemove = (e: HTMLElementEventMap['mousemove']) => {
    requestAnimationFrame(() => getTargetComponent(e.target as HTMLElement))
  }

  const click = (e: HTMLElementEventMap['click']) => {
    const { targetNode, left, top } = getTargetComponent(e.target as HTMLElement) as any;
    const componentid = targetNode?.getAttribute('componentid');
    if (targetNode && componentid) {
      currentState.id = componentid;
      setSelectPosition({ left: left, top: top, width: targetNode.clientWidth, height: targetNode.clientHeight });
    }
  }

  useEffect(() => {
    if (currentStateSnap.id) {
      const simulatorBody = (document.getElementById('sanbox-simulator') as HTMLIFrameElement)?.contentDocument?.body;
      const node = simulatorBody?.querySelector(`[componentid='${currentStateSnap.id}']`);
      if (node) {
        const { left, top } = node.getBoundingClientRect()
        currentState.id = currentStateSnap.id;
        setSelectPosition({ left: left, top: top, width: node.clientWidth, height: node.clientHeight });
      }
    }
  }, [currentStateSnap.id])

  useEffect(() => {
    if (!document.getElementById('sanbox-simulator')) return
    const simulatorBody = (document.getElementById('sanbox-simulator') as HTMLIFrameElement)?.contentDocument?.body;
    simulatorBody?.addEventListener('mousemove', mousemove);
    simulatorBody?.addEventListener('click', click);
    return () => {
      simulatorBody?.removeEventListener('mousemove', mousemove)
      simulatorBody?.removeEventListener('click', click);
    }
  }, [schemaMapStateSnap])


  useEffect(() => {
    if (currentState.id) {
      requestAnimationFrame(() => {
        const simulatorBody = (document.getElementById('sanbox-simulator') as HTMLIFrameElement)?.contentDocument?.body;
        const node = simulatorBody?.querySelector(`[componentid='${currentState.id}']`)
        const { targetNode, left, top } = getTargetComponent(node as HTMLElement) as any;
        setSelectPosition({ left: left, top: top, width: targetNode.clientWidth, height: targetNode.clientHeight });
      })
    }
  }, [schemaMapStateSnap])

  const deleComponent = () => {
    if (actionsState.componentid) {
      setTimeout(() => {
        delSchema(actionsState.componentid as string)
      })
    }
  }

  return <>
    {<div style={{ display: show ? 'block' : 'none' }}>
      <div className="components-actions absolute border-1px border-brand-primary border-dashed pointer-events-none p-r-2px  "
        style={postition}
      />
      <Space className="components-actions rounded-2px absolute bg-brand-primary p-x-5px p-y-3px text-white text-xs" style={{ left: postition.left + 3, top: postition.top + postition.height }}>
        <span>
          {actionsState.componentName}
        </span>
        {actionsState.componentid && actionsState.isSlot && <AddWidget slotId={actionsState.componentid}>
          <PlusSquareOutlined className="text-12px cursor-pointer" />
        </AddWidget>}
        <Tooltip title={<span className="text-12px">删除</span>} arrow={false} placement="bottom" >
          <DeleteOutlined className="text-12px cursor-pointer" onClick={deleComponent} />
        </Tooltip>
      </Space>
    </div>}
    {currentState.id && <div className="components-actions absolute border-2px border-brand-primary pointer-events-none " style={selectPostition}></div>}
  </>
}

export default SelectComponent
