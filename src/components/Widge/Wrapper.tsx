import { currentState, IdSchema, idSchema, schemaMap } from '@/store';
import { CloseOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { FC, ReactNode, useEffect, useState } from 'react';
import { memo } from 'react';
import { useSnapshot } from 'valtio';
import AddWidget from '../AddWidget';
import './index.less';

interface ComponentProps {
  id: string;
  children: ReactNode;
  isSlot?: boolean
}

const Wrapper: FC<ComponentProps> = (props) => {
  const { id, isSlot } = props;
  const currentStateSnap = useSnapshot(currentState);
  const [operatorData, setOperatorData] = useState({
    x: 0,
    y: 0,
  })

  const deleComponent = () => {
    const searchId:any = (idSchema2: IdSchema) => {
      return idSchema2.find((schema,idx) => {
        if (schema.id === id) {
          idSchema2.splice(idx, 1);
          return true
        } else if (schema.slot) {
          return searchId(schema.slot)
        }
        return false
      })
    }
    searchId(idSchema)
    Promise.resolve().then(() => {
      delete currentState.id;
      delete schemaMap[id];
    });
  };

  const cancel = () => {
    Promise.resolve().then(() => {
      delete currentState.id;
    });
  };

  useEffect(() => {
    if (id === currentStateSnap.id) {
      const currentSelectDom = document.getElementById(id);
      const right = currentSelectDom?.getBoundingClientRect().right;
      const bottom = currentSelectDom?.getBoundingClientRect().bottom;
      if(right !== undefined && bottom !== undefined){
        setOperatorData({
          x: right,
          y: bottom
        })
      }
    }
  }, [id, currentStateSnap.id])

  return <>
    <div id={id} className={`hover:editor-hover z-10 m-b1 m-r1 ${id === currentStateSnap.id && 'editor-hover'}`} onClick={(e) => {
      e.stopPropagation();
      e.cancelable = true;
      currentState.id = id;
    }}>
      {
        props.children
      }
    </div>
    {id === currentStateSnap.id && <div className={`fixed text-white z-999999`} style={{ left: operatorData.x, top: operatorData.y }}>
      <div>
        <DeleteOutlined
          onClick={deleComponent}
          className="bg-brand-primary text-white  text-10px cursor-pointer p-8px "
        />
       {<AddWidget slotId={id} >
          <PlusOutlined className="bg-brand-primary  text-white	text-10px cursor-pointer p-8px" />
        </AddWidget>}
        <CloseOutlined
          onClick={cancel}
          className="bg-brand-primary  text-white	text-10px cursor-pointer p-8px"
        />
      </div>
    </div>}
  </>
};

export default memo(Wrapper);
