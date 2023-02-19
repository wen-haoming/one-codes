import { useEffect, useState } from "react";
import { getAttributeNode } from "@/utils";
import { useSnapshot } from "valtio";
import { currentState, IdSchema, idSchemaState, schemaMapState } from "@/store";
import { Space, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

function SelectComponent() {
  const schemaMapStateSnap = useSnapshot(schemaMapState).schemaMap;
  const currentStateSnap = useSnapshot(currentState);
  const [postition, setPosition] = useState({ left: 0, width: 0, height: 0, top: 0 })
  const [selectPostition, setSelectPosition] = useState({ left: 0, width: 0, height: 0, top: 0 })
  const [actionsState, setActionsState] = useState({ componentName: '', componentid: '' });
  const [show, setShow] = useState(false)


  useEffect(() => {
    if (!document.getElementById('sanbox-simulator')) return
    const simulatorBody = (document.getElementById('sanbox-simulator') as HTMLIFrameElement)?.contentDocument?.body;

    const getTargetComponent = (e: HTMLElementEventMap['click']) => {
      const targetNode = getAttributeNode(e.target as HTMLElement, 'componentid') as HTMLElement
      const componentid = targetNode && targetNode?.getAttribute && targetNode.getAttribute('componentid')
      if (targetNode && targetNode.getBoundingClientRect && typeof componentid === 'string') {
        setShow(true)
        if (targetNode.querySelector('.components-actions')) return
        const { left, top, width, height } = targetNode.getBoundingClientRect();
        setPosition({ left: left - 3, top: top - 3, width: width + 2, height: height + 2 });
        setActionsState({
          componentName: schemaMapStateSnap[componentid].componentName,
          componentid
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
      requestAnimationFrame(() => getTargetComponent(e))
    }
    const click = (e: HTMLElementEventMap['click']) => {
      const { targetNode, left, top, width, height } = getTargetComponent(e) as any;
      const componentid = targetNode?.getAttribute('componentid');
      if (targetNode && componentid) {
        currentState.id = componentid;
        setSelectPosition({ left: left, top: top, width: targetNode.clientWidth, height: targetNode.clientHeight });
      }
    }

    simulatorBody?.addEventListener('mousemove', mousemove);
    simulatorBody?.addEventListener('click', click);

    return () => {
      simulatorBody?.removeEventListener('mousemove', mousemove)
      simulatorBody?.removeEventListener('click', click);
    }
  }, [schemaMapStateSnap])

  const deleComponent = () => {
    if (actionsState.componentid) {
      setTimeout(() => {
        const searchId: any = (idSchema2: IdSchema) => {
          return idSchema2.find((schema, idx) => {
            if (schema.id === actionsState.componentid) {
              idSchema2.splice(idx, 1);
              return true
            } else if (schema.slot) {
              return searchId(schema.slot)
            }
            return false
          })
        }
        searchId(idSchemaState.idSchema)
        delete schemaMapState.schemaMap[actionsState.componentid];
        currentState.id = ''
        setShow(false)
      })
    }
  }

  return <>
    {show ? <>
      <div className="components-actions absolute border-1px border-brand-primary border-dashed pointer-events-none p-r-2px  "
        style={postition}
      />
      <Space className="components-actions rounded-2px absolute bg-brand-primary p-x-5px p-y-3px text-white text-xs" style={{ left: postition.left + 3, top: postition.top + postition.height }}>
        <span>
          {actionsState.componentName}
        </span>
        <Tooltip title={<span className="text-12px">删除</span>} arrow={false} placement="bottom" >
          <DeleteOutlined className="text-12px cursor-pointer" onClick={deleComponent} />
        </Tooltip>
      </Space>
    </> : null}
    {currentState.id && <div className="components-actions absolute border-2px border-brand-primary pointer-events-none " style={selectPostition}></div>}
  </>
}

export default SelectComponent
