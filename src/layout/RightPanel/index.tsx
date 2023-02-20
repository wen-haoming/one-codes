import { ref, useSnapshot } from 'valtio';
import { Button, Tabs } from 'antd'
import PropsPanel from './PropsPanel'
export type Install = any;

const RightPanel = () => {

  return (
    <div className="w-1/5  border-brand-line ">
      <Tabs size="small" defaultActiveKey='属性'
        style={{padding:0}}
        className='w-100%' centered items={[
          {
            label: <Button size="small" type="text" block>属性</Button>,
            key: '属性',
            children: <PropsPanel/>,
          },
          {
            label:<Button size="small" type="text" >事件</Button>,
            key: '事件',
            children: '事件',
          },
        ]} />
    </div>
  );
};

export default RightPanel;
