import { AppstoreOutlined, BarsOutlined, LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Input, Modal, Segmented, Space, Spin } from 'antd';
import { useEffect, useState, startTransition, useDeferredValue } from 'react';
import { useRequest, useLocalStorageState } from 'ahooks'
import { depsMap } from '@/store/depsMap';
import ConfigModal from './ConfigModal';
import { ref, useSnapshot } from 'valtio';

export type DependencyItem = {
  label: string;
  value: string;
  latest: string;
  version: string;
}

const LeftPanel = () => {
  const [panelState, setPanelState] = useState<'组件树' | '模块'>('组件树')
  const [depsMapLocal, setDepsMapLocal] = useLocalStorageState('depsMap', { defaultValue: { dependency: [], depsConfig: {} } })
  const depsMapSnap = useSnapshot(depsMap);

  const searchDep = useRequest((name: string) => {
    return fetch(
      `https://api.cdnjs.com/libraries?search=${name}`,
      // 不显示referrer的任何信息在请求头中
      { referrerPolicy: 'no-referrer' }
    ).then(res => res.json()).then(res => {
      return res.results.map((item: any) => {
        return {
          label: item.name,
          value: item.name,
          latest: item.latest,
          version: item.latest?.split('libs')[1].split('/')[2]
        }
      })
    }) as Promise<DependencyItem[]>
  }, { manual: true, debounceWait: 300 })

  const searchDepDeferredVal = useDeferredValue(searchDep.data || []);

  useEffect(() => {
    depsMap.dependency = depsMapLocal.dependency
    depsMap.depsConfig = depsMapLocal.depsConfig;
  }, [])

  useEffect(() => {
    setDepsMapLocal(ref(depsMapSnap) as any)
  }, [depsMapSnap])

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
        panelState === '组件树' && <div>组件树</div>
      }
      {
        panelState === '模块' && <div>
          <AutoComplete
            className='w-100%'
            showSearch
            options={searchDepDeferredVal}
            onSearch={searchDep.run}
            onSelect={(val, item) => {
              if (depsMap.dependency.findIndex((dep) => dep.label === item.label) === -1) {
                startTransition(() => {
                  depsMap.dependency = [...depsMap.dependency, {
                    label: item.label,
                    value: item.label,
                    latest: item.latest,
                    version: item.version,
                  }]
                })
              }
            }}
          >
            <Input prefix={searchDep.loading ? <Spin size="small" indicator={<LoadingOutlined spin />} /> : <SearchOutlined className='text-brand-primary' />} bordered={false} placeholder="search dependency" className='bg-brand-grey hover:bg-brand-grey focus:bg-brand-grey' />
          </AutoComplete>
          <div className='p-t-8px w-100%'>
            {
              (depsMap.dependency || []).map((depButton) => {
                return <ConfigModal {...depButton} key={depButton.label}>
                  <Button type="text" className='m-b-8px flex justify-between' block key={depButton.label}>
                    <span>{depButton.label}</span>
                    <span className='text-gray'>{depButton.version}</span>
                  </Button>
                </ConfigModal>
              })
            }
          </div>
        </div>
      }
    </div>
  </div>;
};

export default LeftPanel;
