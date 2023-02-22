import App from './App';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');

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
          formPropsConfig: {
            type: {
              type: 'options',
              title: '按钮类型',
              componentProps: {
                options: [
                  {
                    label: 'primary',
                    value: 'primary',
                  },
                  {
                    label: 'ghost',
                    value: 'ghost',
                  },
                  {
                    label: 'dashed',
                    value: 'dashed',
                  },
                  {
                    label: 'link',
                    value: 'link',
                  },
                  {
                    label: 'text',
                    value: 'text',
                  },
                ]
              }
            },
            children: {
              type: 'string',
              title: '内容'
            },
            danger: {
              type: "boolean",
              title: '设置危险按钮'
            }
          },
          defaultProps: {
            children: 'button',
            type: 'primary'
          }
        },
        {
          moduleName: 'Input',
          isSlot: false,
        },
        {
          moduleName: 'Divider',
          isSlot: false,
        },
        {
          moduleName: 'Select',
          isSlot: false,
          defaultProps:{
            options:[
              {label:'a',value:'a'},
              {label:'b',value:'b'},
            ],
            style:{
              width:200
            }
          }
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
          defaultProps: {
            title: '默认尺寸',
            tooltip: '这是提示'
          }
        }]
      }
      ]} />)
}
