import { Button } from 'antd';

const LeftPanel = () => {
 
  return <div className="w-150px border-brand-line text-white">
      <div className='flex items-center h-20px border-brand-line border-b-1px'>
          <Button type="text" size="small" onClick={()=>{
          }}>+</Button>
      </div>
  </div>;
};

export default LeftPanel;
