import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Button, Segmented } from 'antd';
import { useState } from 'react';
import { dependencyConfigState } from '@/store';
import ComponentTree from './ComponentTree';
import { useSnapshot } from 'valtio';


export type DependencyItem = {
  label: string;
  value: string;
  latest: string;
  version: string;
}

const LeftPanel = () => {
  const [panelState, setPanelState] = useState<'组件树' | '模块'>('组件树')
  const dependencyConfigSnap  = useSnapshot(dependencyConfigState);

  return <div className="w-200px border-brand-line flex flex-col">
    <Segmented
      value={panelState}
      onChange={(val) => setPanelState(val as '组件树' | '模块')}
      block
      options={[
        {
          label: '组件树',
          value: '组件树',
          icon: <BarsOutlined />,
        },
        {
          label: '模块',
          value: '模块',
          icon: <AppstoreOutlined />,
        },
      ]}
    />
    <div className='flex-1 p-5px'>
      {
        panelState === '组件树' && <div>
          <ComponentTree/>
        </div>
      }
      {
        panelState === '模块' && <div className='p-t-8px w-100%'>
            {
              ((dependencyConfigSnap.dependencyConfigState) || []).map((depButton) => {
                return  <Button type="text" className='m-b-8px flex justify-between' block key={depButton.libraryName}>
                <span>{depButton.libraryName}</span>
                <span className='text-gray'>{depButton.libraryVersion}</span>
              </Button>
              })
            }
          </div>
      }
    </div>
  </div>;
};

export default LeftPanel;
