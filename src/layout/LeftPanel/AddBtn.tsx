import { Button, Form, Space, Input, Popover, Switch } from "antd";
import { PlusOutlined } from '@ant-design/icons'


// export type Install = {
//   typeName: string,
//   icon?: string;
//   children: {
//     title?: string;
//     component: any;
//     componentName: string,
//     configProps?: any[];
//     isSlot?: boolean;
//     defaultProps?: any;
//   }[]
// }[]


function AddBtn(props: {
  value?: any[];
  onChange?: (list: any[]) => void;
}) {
  const { value, onChange } = props;
  return <>
    <Form.List name="moduleConfig" initialValue={value}>
      {(fields, { add, remove }) => (
        <Space wrap align="center">
          {fields.map(({ key, name, ...restField }, id) => {
            return (
              <Popover key={id} arrow={false} content={<Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <div>
                  <Form.Item
                    {...restField}
                    name={[name, 'moduleName']}
                    rules={[{ required: true, message: 'Missing first name' }]}
                    label="组件名"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'isSlot']}
                    label="是否嵌套"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  <Button block danger type="primary" onClick={() => {
                    remove(name);
                    onChange && onChange(fields)
                  }}>删除</Button>
                </div>
              </Space>}>
                <Form.Item dependencies={[name]}>
                  {({ getFieldValue }) => {
                    const { moduleName } = (getFieldValue('moduleConfig')[id]) || {}
                    return <Button >
                      {moduleName || 'module'}
                    </Button>
                  }}
                </Form.Item>
              </Popover>
            )
          })}
          <Form.Item >
            <Button type="dashed" onClick={() => {
              add();
              onChange && onChange(fields)
            }} icon={<PlusOutlined />}>
              Add field
            </Button>
          </Form.Item>
        </Space>
      )}
    </Form.List>
  </>
}

export default AddBtn
