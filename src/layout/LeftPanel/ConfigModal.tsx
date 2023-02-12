import { Button, Form, Input, Modal } from 'antd';
import { useBoolean, useLocalStorageState } from 'ahooks'
import { ReactElement, cloneElement, useEffect } from 'react';
import { DependencyItem } from '.';
import AddBtn from './AddBtn';
import { depsMap } from '@/store/depsMap';
import { ref, useSnapshot } from 'valtio';

const { Item } = Form

export type ModuleComponent = {
  moduleName: string;
  moduleConfig: {
    moduleName: string;
    isSlot: boolean;
  }[]
}

function ConfigModal(props: {
  children: ReactElement;
} & DependencyItem) {
  const { label, version } = props;
  const [open, { setTrue, setFalse }] = useBoolean();
  const [form] = Form.useForm()
  const depsMapSnap = useSnapshot(depsMap);
  // const [depsMapLocal, setDepsMapLocal] = useLocalStorageState('depsMap')

  useEffect(() => {
    if (open && depsMapSnap.depsConfig[label]) {
      form.setFieldsValue(depsMapSnap.depsConfig[label])
    }
  }, [open, depsMapSnap.depsConfig[label]])

  const onFinish = async () => {
    const values = await form.validateFields();
    depsMap.depsConfig[label] = values;
    // setDepsMapLocal(ref(depsMap))
    setFalse();
    form.resetFields();
  }
  return <>
    {cloneElement(props.children, {
      onClick: setTrue
    })}
    <Modal title={`${label}-${version}`} width={600} open={open} onOk={onFinish} onCancel={setFalse} footer={[
      <Button type="primary" danger key="delete" onClick={() => {
        depsMap.dependency = depsMap.dependency.filter(item => item.label !== label);
        delete depsMap.depsConfig[label]
        setFalse();
      }}>删除改库</Button>,
      <Button key="cancel" onClick={setFalse}>取消</Button>,
      <Button type="primary" key="confirm" onClick={onFinish}>确认</Button>,
    ]}>
      <Form form={form} labelCol={{ span: 5 }}>
        <Item rules={[{ required: true }]} label="moduleName" name="moduleName">
          <Input />
        </Item>
        <Item rules={[{ required: true }]} label="组件配置" >
          <AddBtn />
        </Item>
      </Form>
    </Modal>
  </>
}

export default ConfigModal
