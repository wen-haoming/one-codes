import { Button, Form, Input, Table } from 'antd';
import { useDynamicList } from 'ahooks';

export interface JSONProps {
  propsName?: string;
  propsValue?: string;
}

export default ({ value, onChange }: any) => {

  const { list, remove, getKey, move, push, sortList, } = useDynamicList<JSONProps>(value||[]);

  const [form] = Form.useForm();

  const columns = [
    {
      title: '属性名',
      dataIndex: 'propsName',
      key: 'propsName',
      render: (text: string, row: JSONProps, index: number) => (
        <Form.Item name={['table', getKey(index), 'propsName']} initialValue={text} noStyle>
          <Input  style={{ width: '100%' }} />
        </Form.Item>
      ),
    },
    {
      title: '属性值',
      dataIndex: 'propsValue',
      key: 'propsValue',
      render: (text: string, row: JSONProps, index: number) => (
        <Form.Item name={['table', getKey(index), 'propsValue']} initialValue={text} noStyle>
          <Input style={{ width: '100%' }} />
        </Form.Item>
      ),
    },

  ];



  return (
    <div style={{width:500}}>
      <Form
        initialValues={{
          table: value || []
        }}
        form={form}
        key="propsValue"
        onValuesChange={(v, values) => {
          onChange(values.table || [])
        }}>
        <Table
          bordered
          size="small"
          columns={columns}
          dataSource={list}
          pagination={false}
        />
      </Form>
      <Button
        style={{ marginTop: 8 }}
        block
        type="dashed"
        onClick={() => push({})}
      >
        + Add row
      </Button>
    </div>
  );
};
