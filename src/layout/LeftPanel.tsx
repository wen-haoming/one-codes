import { AppstoreOutlined, BarsOutlined, SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Input, Segmented, Space } from 'antd';
import { useState } from 'react';
import { useRequest } from 'ahooks'


type DependencyItem = {
  label: string;
  value: string;
  latest: string;
  version: string;
}

const LeftPanel = () => {
  const [panelState, setPanelState] = useState<'组件树' | '模块'>('组件树')
  const [depList, setDeplist] = useState<DependencyItem[]>([]);

  const searchDep = useRequest((name: string) => {
    return fetch(
      `https://api.cdnjs.com/libraries?search=${name}`,
      // 不显示referrer的任何信息在请求头中
      { referrerPolicy: 'no-referrer' }
    ).then(res => res.json()).then(res => {
      return res.results.map((item: any) => {
        console.log(item,'item')
        return {
          label: item.name,
          value: item.name,
          latest: item.latest,
          version: item.latest?.split('libs')[1].split('/')[2]
        }
      })
    }) as Promise<DependencyItem[]>
  }, { manual: true, debounceWait: 300 })

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
            options={(searchDep.data )|| []}
            onSearch={searchDep.run}
            onSelect={(val, item) => {
              setDeplist([...depList, {
                label: item.label,
                value: item.label,
                latest: item.latest,
                version: item.version
              }])
            }}
          >
            <Input prefix={<SearchOutlined/>} bordered={false} placeholder="search dependency" className='bg-brand-grey hover:bg-brand-grey focus:bg-brand-grey' />
          </AutoComplete>
          <div className='p-t-8px w-100%'>
            {
              depList.map((depButton)=>{
                return <Button type="text" className='m-b-8px flex justify-between' block>
                  <span>{depButton.label}</span>
                  <span className='text-gray'>{depButton.version}</span>
                </Button>
              })
            }
          </div>
        </div>
      }
    </div>
  </div>;
};

export default LeftPanel;
