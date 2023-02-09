import Code from '@/components/Code';
import { currentState } from '@/store';
import { FileTextOutlined, FormOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import { useSnapshot } from 'valtio';
import Render from '@/components/Render';

const RenderPanel = () => {
  const currentStateSnap = useSnapshot(currentState);

  return (
    <div className="flex flex-col flex-1 bg-brand-grey p-t-0">
      <Space className="flex h-7 w-full bg-white b-brand-grey border-l-1 border-r-1 justify-end items-center p-x2">
        <Tooltip title="编辑模式" overlayInnerStyle={{ fontSize: 12, borderRadius: 5 }} arrow={false}>
          <Button size="small" type="text"
            onClick={() => {
              currentState.panelMode = 'edit'
            }}
            style={{
              color: currentStateSnap.panelMode === 'edit' ? '#2558fb' : '#9b9b9b'
            }} icon={<FormOutlined />} />
        </Tooltip>
        <Tooltip title="代码查看模式" overlayInnerStyle={{ fontSize: 12, borderRadius: 5 }} arrow={false} >
          <Button size="small" type="text"
            onClick={() => {
              currentState.panelMode = 'code'
            }}
            style={{
              color: currentStateSnap.panelMode === 'code' ? '#2558fb' : '#9b9b9b'
            }} icon={<FileTextOutlined />} />
        </Tooltip>
      </Space>
      <div className="h-[calc(100vh-5rem)] bg-white overflow-y-auto m-2 p-1 flex-col">
        {currentStateSnap.panelMode === 'edit' && <Render />}
        {currentStateSnap.panelMode === 'code' && <Code />}
      </div>
    </div>
  )
};

export default RenderPanel;
