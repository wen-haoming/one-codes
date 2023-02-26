import App from './App';
import './index.css';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(<App
    style={{height:'100%'}}
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
            block: {
              type: 'boolean',
              title: '是否区块'
            },
            htmlType: {
              type: 'valueEnum',
              title: '表单提交按钮',
              componentProps: {
                valueEnum: {
                  submit: 'submit',
                  'undefined': 'undefined'
                }
              }
            },
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
          defaultProps: {
            options: [
              { label: 'a', value: 'a' },
              { label: 'b', value: 'b' },
            ],
            style: {
              width: 200
            }
          }
        },
        {
          moduleName: 'Card',
          isSlot: true,
          formPropsConfig: {
            size: {
              type: 'valueEnum',
              title: 'card 的尺寸',
              componentProps: {
                valueEnum: {
                  default: 'default',
                  small: 'small'
                }
              }
            },
            title: {
              type: 'string',
              title: '标题'
            }
          },
          defaultProps: {
            size: 'small',
            title: 'card'
          }
        },
        {
          moduleName: 'Form',
          isSlot: true,
          formPropsConfig: {
            layout: {
              title: '表单布局',
              type: "options",
              componentProps: {
                options: [
                  { label: 'horizontal', value: 'horizontal' },
                  { label: 'vertical', value: 'vertical' },
                  { label: 'inline', value: 'inline' },
                ]
              }
            }
          },
          defaultProps: {}
        },
        {
          moduleName: 'Form.Item',
          isSlot: true,
          formPropsConfig: {
            required: {
              title: '是否必填',
              type: "boolean"
            },
            label: {
              title: 'label',
              type: 'string'
            },
            name: {
              title: 'name',
              type: 'string',
            }
          },
          defaultProps: {
           
          }
        }
        ]
      },
      {
        libraryName: 'pro-components',
        libraryGlobalImport: 'ProComponents',
        libraryUrl: 'https://unpkg.com/@ant-design/pro-components@2.3.52/dist/components.min.js',
        libraryVersion: '2.3.52',
        moduleConfig: [
          {
            moduleName: 'ProCard',
            isSlot: false,
            defaultProps: {
              title: '默认尺寸',
              tooltip: '这是提示'
            }
          },
        ]
      }
      ]} />)
}
