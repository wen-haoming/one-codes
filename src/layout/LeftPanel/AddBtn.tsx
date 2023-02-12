import { Button, Form, Space, Input, Popover, Switch, Badge } from "antd";
import { CodepenOutlined, PlusOutlined } from '@ant-design/icons'
import JSONView from './JSONView';

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
                  <Form.Item name={[name, 'defaultProps']} label="默认属性">
                    <JSONView />
                  </Form.Item>
                  <Button block danger type="primary" onClick={() => {
                    remove(name);
                    onChange && onChange(fields)
                  }}>删除</Button>
                </div>
              </Space>}>
                <Form.Item dependencies={[name]}>
                  {({ getFieldValue, getFieldError }) => {
                    const isError = getFieldError(['moduleConfig', id, 'moduleName']).length > 0;
                    const { moduleName } = (getFieldValue('moduleConfig')[id]) || {}
                    return <div
                      className={`widgetBtn flex-1 text-2 flex items-center border-red border-${isError ? '1' : "0"}px`}
                    >
                      <CodepenOutlined
                        style={{ color: '#2558fb' }}
                        className="m-r-3 text-4"
                      />
                      {moduleName || 'module'}
                    </div>
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
