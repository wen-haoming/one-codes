import Code from '@/components/Code';
import { currentState } from '@/store';
import { FileTextOutlined, FormOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip, Segmented, theme } from 'antd';
import { useSnapshot } from 'valtio';
import Simulator from '@/components/Simulator';
import AddWidget from '@/components/AddWidget';
const { useToken } = theme

const RenderPanel = () => {
  const currentStateSnap = useSnapshot(currentState);
  const {token} = useToken()
  return (
    <div className="flex flex-col flex-1  p-t-0" >
      <Space className="flex w-full justify-between items-center">
        <div>
          <Tooltip title="添加组件" overlayInnerStyle={{ fontSize: 12, borderRadius: 5 }} arrow={false}>
            <AddWidget>
              <Button size="small" className='text-brand-primary' type="link"
                icon={<PlusSquareOutlined />} />
            </AddWidget>
          </Tooltip>
        </div>
        <div>
          <Segmented value={currentStateSnap.panelMode} onChange={(val) => {
            currentState.panelMode = val as 'edit' | 'code';
          }} options={[{
            label: '画布',
            value: 'edit',
            icon: <FormOutlined />
          }, {
            label: '代码',
            value: 'code',
            icon: <FileTextOutlined />
          }]} />
        </div>
        <div></div>
      </Space>
      <div className="h-[calc(100vh-7rem)] overflow-y-auto m-2 p-1 flex-col p-5px " style={{background:token.colorBorder,borderRadius:token.borderRadius}}>
        <div className='h-100% bg-white' style={{ display: currentStateSnap.panelMode === 'edit' ? 'block' : 'none' }}>
          <Simulator />
        </div>
        <div className='h-100% bg-white' style={{ display: currentStateSnap.panelMode === 'code' ? 'block' : 'none' }}>
          <Code />
        </div>
      </div>
    </div>
  )
};

export default RenderPanel;
