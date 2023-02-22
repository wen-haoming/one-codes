import { ModuleProps, ModulePropsTypeVal } from '@/App';
import { Form, Input, InputNumber, Select, Switch } from 'antd';
import { useEffect } from 'react';

const { Item } = Form

const CustomerRender = (props: {
  type: ModulePropsTypeVal
  componentProps?: Record<string, any>
}) => {
  const { type, componentProps, ...innerProps } = props;
  if (type === 'boolean') {
    return <Switch {...componentProps} {...innerProps}></Switch>
  } else if (type === 'number') {
    return <InputNumber  {...componentProps} {...innerProps} />
  } else if (type === 'string') {
    return <Input  {...componentProps} {...innerProps} />
  } else if (type === 'options') {
    return <Select style={{ width: '100%' }}  {...componentProps}  {...innerProps} />
  } else if (type === 'valueEnum') {
    const { valueEnum, ...valuProps } = componentProps || {}
    return <Select style={{ width: '100%' }} {...innerProps}  {...valuProps} options={Object.entries(valueEnum ? componentProps?.valueEnum : {}).map(([value, label]) => ({ label, value }))} />
  } else {
    return null
  }

}

function FormRender(props: {
  formPropsConfig: ModuleProps
  defaultProps?: Record<string, any>
  onValuesChange?: (values: Record<string, any>) => void
}) {

  const { formPropsConfig, defaultProps = {}, onValuesChange } = props;
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(JSON.parse(JSON.stringify(defaultProps)));
  }, [formPropsConfig, defaultProps])

  return <Form form={form} layout="vertical" onValuesChange={(r, values) => {
    console.log(values,'values')
    onValuesChange && onValuesChange(values)
  }}>
    {
      Object.entries(formPropsConfig).map(([name, item]) => {
        return <Item
          label={item.title}
          name={name}
          key={name}
          valuePropName={item.type === 'boolean' ? 'checked' : 'value'}
        >
          <CustomerRender type={item.type} componentProps={item.componentProps} />
        </Item>
      })
    }
  </Form>
}

export default FormRender
