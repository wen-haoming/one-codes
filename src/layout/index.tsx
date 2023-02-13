import Header from './Header';
import RenderPanel from './RenderPanel';
import RightPanel from './RightPanel';
import LeftPanel from './LeftPanel';
import { Store } from '@/store/Store';

const Layout = () => {
  return (
    <>
    <div className="flex flex-col relative w-full	h-full">
      <Header />
      <div className="flex flex-1">
       
        <LeftPanel />
        <RenderPanel />
        <RightPanel />
      </div>
    </div>
    </>
  );
};

export default Layout;
