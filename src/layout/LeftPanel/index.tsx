import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Button, Segmented, Collapse, theme } from 'antd';
import { useState } from 'react';

import { dependencyConfigState } from '@/store';
import ComponentTree from './ComponentTree';
import { useSnapshot } from 'valtio';

const { Panel } = Collapse;

export type DependencyItem = {
  label: string;
  value: string;
  latest: string;
  version: string;
}

const LeftPanel = () => {
  const [panelState, setPanelState] = useState<'组件树' | '模块'>('组件树')
  const dependencyConfigSnap = useSnapshot(dependencyConfigState);

  return <div className="w-200px  flex flex-col">
    <Collapse accordion size="small" bordered={false} defaultActiveKey={[1]}>
      <Panel header="组件树" key="1" style={{ border: 'none', padding: 0}}>
        <div className='flex-1'>
          <ComponentTree />
        </div>
      </Panel>
      <Panel header="模块" key="2" style={{ border: 'none', padding: 0 }}>
        <div className='p-t-8px w-100%'>
          {
            ((dependencyConfigSnap.dependencyConfigState) || []).map((depButton) => {
              return <Button type="text" className='m-b-8px flex justify-between' block key={depButton.libraryName}>
                <span>{depButton.libraryName}</span>
                <span className='text-gray'>{depButton.libraryVersion}</span>
              </Button>
            })
          }
        </div>
      </Panel>
    </Collapse>
  </div>;
};

export default LeftPanel;
