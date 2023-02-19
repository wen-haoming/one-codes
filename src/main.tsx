import App from './App';
import { createRoot } from 'react-dom/client';
import 'uno.css';

// import { TableFormRender } from '@antd-one/components';
// import Columns from './Columns'
// import { ProFormText, ProForm, QueryFilter, ProFormDatePicker, ProFormCheckbox, ProFormRadio, ProFormTextArea } from '@ant-design/pro-components'
// import { Button, Card, Input, Modal } from 'antd'

const container = document.getElementById('root');

const random = () => Math.floor(Math.random() * 100000).toString(16);

if (container) {
  const root = createRoot(container);
  root.render(<App
    dependencyConfig={
      [{
        libraryName: 'react',
        libraryGlobalImport: 'React',
        libraryUrl: 'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
        libraryVersion: '18.2.0',
      }, {
        libraryName: 'react-dom',
        libraryGlobalImport: 'ReactDom',
        libraryUrl: 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
        libraryVersion: '18.2.0',
      }, {
        libraryName: 'dayjs',
        libraryUrl: 'https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.7/dayjs.min.js',
        libraryVersion: '1.11.7',
      },
      {
        libraryName: 'antd',
        libraryGlobalImport: 'antd',
        libraryUrl: 'https://cdnjs.cloudflare.com/ajax/libs/antd/5.2.1/antd.min.js',
        libraryVersion: '5.2.1',
        moduleConfig: [{
          moduleName: 'Button',
          isSlot: false,
          defaultProps: [{ 'propsName': 'children', propsValue: 'button' },{'propsName':'type',propsValue:'primary'}]
        },
        {
          moduleName: 'Input',
          isSlot: false,
          defaultProps: []
        },
        {
          moduleName: 'Divider',
          isSlot: false,
          defaultProps: []
        },
        {
          moduleName: 'Select',
          isSlot: false,
        }
      ]
      },
      {
        libraryName: 'pro-components',
        libraryGlobalImport: 'ProComponents',
        libraryUrl: 'https://unpkg.com/@ant-design/pro-components@2.3.52/dist/components.min.js',
        libraryVersion: '2.3.52',
        moduleConfig: [{
          moduleName: 'ProCard',
          isSlot: false,
          defaultProps: [{ propsName: 'title', propsValue: '默认尺寸' }, { propsName: 'tooltip', propsValue: '这是提示' }]
        }]
      }
      ]} />)
}
