import { currentState, idSchema, schemaMap } from '@/store';
import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { FC, ReactNode, useEffect, useMemo } from 'react';
import { memo, useCallback, cloneElement } from 'react';
import { useSnapshot } from 'valtio';
import AddWidget from '../AddWidget';
import './index.less';

interface ComponentProps {
  id: string;
  children: ReactNode;
  inlineBlock?: boolean;
  isSlot?: boolean
}

const Wrapper: FC<ComponentProps> = (props) => {
  const { id, inlineBlock = false, isSlot } = props;
  const currentStateSnap = useSnapshot(currentState);

  const handleClick = useCallback(() => {
    currentState.id = id;
  }, [id]);

  const deleComponent = () => {
    const findIndex = idSchema.findIndex((item) => item.id === id);
    idSchema.splice(findIndex, 1);
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

  const cloneEle = cloneElement(props.children, {
    className: `relative hover:editor-hover z-10 m-b1 m-r1 ${id === currentStateSnap.id && 'editor-hover'
      } ${inlineBlock ? 'inline-block' : 'inline-block'}`,
    onClick: handleClick
  })

  const operator = useMemo(()=> <div className="absolute right-0px	bottom-0px text-white">
  <div>
    <DeleteOutlined
      onClick={deleComponent}
      className="bg-brand-primary text-white  text-10px cursor-pointer p-8px "
    />
    <CloseOutlined
      onClick={cancel}
      className="bg-brand-primary  text-white	text-10px cursor-pointer p-8px"
    />
    <AddWidget slotId={id} />
</div>
</div>,[id])

  useEffect(()=>{
    if(id === currentStateSnap.id){
      console.log(cloneEle)
    }
  },[id,currentStateSnap.id])

  return cloneEle
};

export default memo(Wrapper);
