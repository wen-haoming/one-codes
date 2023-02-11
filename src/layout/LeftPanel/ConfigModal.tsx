import { Form, Input, Modal } from 'antd';
import { useBoolean } from 'ahooks'
import { ReactElement, cloneElement } from 'react';
import { DependencyItem } from '.';

const { Item } = Form

function ConfigModal(props: {
  children: ReactElement;
} & DependencyItem) {
  const { label, value, version, latest } = props;
  const [open, { setTrue, setFalse }] = useBoolean();
  const [form] = Form.useForm()


  return <>
    {cloneElement(props.children, {
      onClick: setTrue
    })}
    <Modal title={`${label}-${version}`} open={open} onOk={async ()=>{
     const values =  await form.validateFields();
     
    }} onCancel={setFalse}>
      <Form form={form}>
        <Item rules={[{ required: true }]} label="moduleName" name="moduleName">
          <Input></Input>
        </Item>
      </Form>
    </Modal>
  </>
}

export default ConfigModal
