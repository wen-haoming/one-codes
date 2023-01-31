import App from './App';
import { createRoot } from 'react-dom/client';
import { ProFormText, ProForm, QueryFilter, ProFormDatePicker, ProFormCheckbox, ProFormRadio, ProFormTextArea } from '@ant-design/pro-components'
import { TableFormRender, TableFormRenderProps } from '@antd-one/components';
import Columns from './Columns'
import 'uno.css';
import 'antd/dist/antd.css'
import '@formily/antd/dist/antd.css'
const container = document.getElementById('root');
const random = () => Math.floor(Math.random() * 100000).toString(16);
import { Button, Card, Input, Modal } from 'antd'

if (container) {
  const root = createRoot(container);
  root.render(<App
    install={[
      {
        typeName: 'FormRender组件',
        icon: '',
        children: [
          {
            component:TableFormRender,
            componentName:'TableFormRender',
            defaultProps:{
              tableProps: {
                size: 'small',
                rowKey: 'id',
              },
              request: async () => {
                return new Promise((r) => {
                  setTimeout(() => {
                    r({
                      total: 1000,
                      list: Array(1000)
                        .fill('')
                        .map((_, idx) => ({
                          id: idx,
                          a: random(),
                          b: random(),
                          c: random(),
                          d: random(),
                          e: random(),
                        })),
                    });
                  }, 300);
                });
              },
              columns: [

                {
                  title: 'a',
                  dataIndex: 'a',
                  searchField: {
                    type: 'Input',
                    required: true,
                    title: '选项',
                    props: {
                      options: [
                        { label: '选项1', value: '1 ' },
                        { label: '选项2', value: '2' },
                      ],
                    },
                  },
                },
                {
                  title: 'b',
                  dataIndex: 'b',
                  searchField: {
                    type: 'Select',
                    props: {
                      options: [
                        { label: '选项1', value: ' 1 ' },
                        { label: '选项2', value: ' 2' },
                      ],
                    },
                  },
                },
                {
                  title: 'c',
                  dataIndex: 'c',
                  searchField: {
                    type: 'Select',
                    title: 'c',
                    props: {
                      options: [
                        { label: '选项1', value: ' 1 ' },
                        { label: '选项2', value: ' 2' },
                      ],
                    },
                  },
                },
                {
                  title: 'd',
                  dataIndex: 'd',
                  searchField: {
                    type: 'Select',
                    title: 'c',
                    props: {
                      options: [
                        { label: '选项1', value: ' 1 ' },
                        { label: '选项2', value: ' 2' },
                      ],
                    },
                  },
                },
                {
                  title: 'e',
                  dataIndex: 'e',
                  searchField: {
                    type: 'Select',
                    props: {
                      options: [
                        { label: '选项1', value: ' 1 ' },
                        { label: '选项2', value: ' 2' },
                      ],
                    },
                  },
                },
              ],
            },
            configProps: [
              {
                type: 'Select',
                title: 'table-size',
                name: 'tableProps.size',
                enum: [
                  { label: '小', value: 'small' },
                  { label: '中', value: 'middle' },
                  { label: '大', value: 'large' },
                ],
              },
              {
                type: 'Switch',
                title: 'borded',
                name: 'tableProps.bordered',
                valueType: 'Boolean',
              },
              {
                type: Columns,
                name: 'columns',
                title: 'columns配置',
              },
            ]
          },
          {
            component: Card,
            componentName: 'Card',
            defaultProps: {
              size: 'small',
              title: 'title',
            },
            configProps:[
              {
                type:'Input',
                name:'title',
                title:'title'
              },
              {
              type:'Select',
              enum:[{value:'small',label:'small',},{value:'default',label:'default'}],
              name:'size',
              title:'size'
            }
          ]
          },
         ]
      },
      {
        typeName: 'Antd 组件',
        icon: '',
        children: [
          {
            component: Input,
            componentName: 'Input',
            isSlot: false,
            defaultProps: {
              bordered: true,
            },
            configProps: [
              {
                type: 'Switch',
                name: 'showCount',
                title: '是否显示数字'
              },
              {
                type: 'Switch',
                name: 'bordered',
                title: '是否有边框'
              },
              {
                type: 'Switch',
                name: 'allowClear',
                title: '可以点击清除图标删除内容'
              },
            ]
          },
          {
            component: Button,
            componentName: 'Button',
            isSlot: false,
            defaultProps: {
              block: false,
              type:'default',
              shape:'default',
              children:'Button'
            },
            configProps: [
              {
                type: 'Input',
                name: 'children',
                title: '内容'
              },
              {
                type: 'Switch',
                name: 'block',
                title: '将按钮宽度调整为其父宽度的选项'
              },
              {
                type: 'Switch',
                name: 'danger',
                title: '设置危险按钮'
              },
              {
                type: 'Select',
                name: 'shape',
                title: '设置按钮形状',
                enum: [
                  {
                    label: 'default',
                    value: 'default'
                  },
                  {
                    label: 'circle',
                    value: 'circle'
                  },
                  {
                    label: 'round',
                    value: 'round'
                  },
                ]
              },
              {
                type: 'Select',
                name: 'type',
                title: '设置按钮类型',
                enum: [
                  {
                    label: 'default',
                    value: 'default'
                  },
                  {
                    label: 'primary',
                    value: 'primary'
                  },
                  {
                    label: 'ghost',
                    value: 'ghost'
                  },
                  {
                    label: 'dashed',
                    value: 'dashed'
                  },
                  {
                    label: 'link',
                    value: 'link'
                  },
                  {
                    label: 'text',
                    value: 'text'
                  },
                ]
              },
            ]
          },
          {
            component: (props:any) => {
              return <>
                <Button>
                  Modal
                </Button>
                <Modal {...props} />
              </>
            },
            componentName: 'Modal',
            isSlot: false,
            defaultProps: {
              maskClosable: true,
              title: 'title',
              width: 520,
              open: false
            },
            configProps: [
              {
                type: 'Switch',
                name: 'maskClosable',
                title: '点击蒙层是否允许关闭'
              },
              {
                type: 'Input',
                name: 'title',
                title: '标题'
              },
              {
                type: 'NumberPicker',
                name: 'width',
                title: '宽度'
              },
              {
                type: 'Switch',
                name: 'open',
                title: '对话框是否可见'
              }
            ]
          },
        ]
      },
      {
        typeName: '表单组件',
        icon: '',
        children: [
          {
            component: ProFormText,
            componentName: 'ProFormText',
            isSlot: false,
            defaultProps: {
              label: 'abc',
              name: 'abc'
            },
            configProps: [{
              type: 'Switch',
              name: 'fieldProps.showCount',
              title: '是否显示数字'
            }]
          },
          {
            component: ProFormDatePicker,
            isSlot: false,
            componentName: 'ProFormDatePicker',
            defaultProps: {
              label: 'ProFormDatePicker',
              name: 'ProFormDatePicker'
            }
          },
          {
            component: ProFormCheckbox,
            componentName: 'ProFormCheckbox',
            isSlot: false,
            defaultProps: {
              label: 'ProFormCheckbox',
              name: 'ProFormCheckbox'
            }
          },
          {
            component: ProFormRadio,
            componentName: 'ProFormRadio',
            isSlot: false,
            defaultProps: {
              label: 'ProFormRadio',
              name: 'ProFormRadio'
            }
          },
          {
            component: ProFormTextArea,
            componentName: 'ProFormTextArea',
            isSlot: false,
            defaultProps: {
              label: 'ProFormTextArea',
              name: 'ProFormTextArea'
            }
          },
          {
            component: ProForm,
            componentName: 'ProForm',
            isSlot: true,
            defaultProps: {
              layout: 'inline'
            }
          },
          {
            component: QueryFilter,
            componentName: 'QueryFilter',
            isSlot: true,
            configProps: [{
              type: 'Switch',
              name: 'defaultCollapsed',
              title: '默认收起'
            }, {
              type: 'Switch',
              name: 'split',
              title: '每一行是否有分割线'
            }, {
              type: 'NumberPicker',
              name: 'labelWidth',
              title: 'label 宽度'
            }],
            defaultProps: {
              defaultCollapsed: true,
              labelWidth: 80
            }
          }]
      },
    ]} />)
}
