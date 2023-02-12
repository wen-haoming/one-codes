import { IdSchema, store } from '@/store';
import { CloseOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Input, Tooltip } from 'antd';
import { FC, ReactNode, useEffect, useState, Children, useMemo } from 'react';
import { memo } from 'react';
import { useSnapshot } from 'valtio';
import AddWidget from '../AddWidget';

interface ComponentProps {
  id: string;
  children: ReactNode;
  isSlot?: boolean
}

const Wrapper: FC<ComponentProps> = (props) => {
  const { id, isSlot } = props;
  const currentStateSnap = useSnapshot(store.currentState);
  const schemaMapSnap = useSnapshot(store.schemaMap);
  const [wrapperDisplay, setWrapperDisplay] = useState<'inline-block' | 'block' | ''>('')
  const [operatorData, setOperatorData] = useState({
    x: 0,
    y: 0,
  })

  const deleComponent = () => {
    const searchId: any = (idSchema2: IdSchema) => {
      return idSchema2.find((schema, idx) => {
        if (schema.id === id) {
          idSchema2.splice(idx, 1);
          return true
        } else if (schema.slot) {
          return searchId(schema.slot)
        }
        return false
      })
    }
    searchId(store.idSchema)
    Promise.resolve().then(() => {
      delete store.currentState.id;
      delete store.schemaMap[id];
    });
  };

  const cancel = () => {
    Promise.resolve().then(() => {
      delete store.currentState.id;
    });
  };

  useEffect(() => {
    const wrapperDom = document.getElementById(id);
    if (props.children && Children.count(props.children) === 1 && wrapperDom && wrapperDom.childNodes[0]) {
      setWrapperDisplay(window.getComputedStyle(wrapperDom.childNodes[0] as any).display as any || '');
    }
    if (id === currentStateSnap.id) {
      // const currentSelectDom = document.getElementById(id);
      const right = wrapperDom?.getBoundingClientRect().right;
      const bottom = wrapperDom?.getBoundingClientRect().bottom;
      if (right !== undefined && bottom !== undefined) {
        setOperatorData({
          x: document.documentElement.clientWidth - right,
          y: bottom
        })
      }
    }
  }, [id, currentStateSnap.id])

  return <>
    <div id={id} className={`hover:editor-hover z-10 m-b1 m-r1 ${id === currentStateSnap.id && 'editor-hover'} ${wrapperDisplay}`} onClick={(e) => {
      e.stopPropagation();
      e.cancelable = true;
      store.currentState.id = id;
    }}>
      {
        props.children
      }
    </div>
    {id === currentStateSnap.id && <div className={`fixed z-999999999999 bg-brand-primary flex text-white items-center	p-2px rounded-3px`} style={{ right: operatorData.x, top: operatorData.y + 5 }}>
      <ConfigProvider prefixCls='one-codes' componentSize="small">
        <span className="px-5px text-12px">
          {schemaMapSnap[id].componentName}
        </span>
        <Input.Group compact style={{ borderRadius: 5 }}>
          <AddWidget slotId={id} />
          <Tooltip title="删除组件" overlayInnerStyle={{ fontSize: 12, borderRadius: 5 }} showArrow={false}>
            <Button
              className='bg-brand-primary  text-white	text-10px cursor-pointer p-8px'
              type="primary"
              onClick={deleComponent}
              icon={<DeleteOutlined
                style={{ fontSize: 12 }}
              />} />
          </Tooltip>
          <Tooltip title="取消" overlayInnerStyle={{ fontSize: 12, borderRadius: 5 }} showArrow={false}>
            <Button
              className='bg-brand-primary  text-white	text-10px cursor-pointer p-8px'
              type="primary"
              onClick={cancel}
              icon={<CloseOutlined
                style={{ fontSize: 12 }}
              />} />
          </Tooltip>
        </Input.Group>
      </ConfigProvider>
    </div>}
  </>
};

export default memo(Wrapper);
