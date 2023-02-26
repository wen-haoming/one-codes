import Header from './Header';
import RenderPanel from './RenderPanel';
import RightPanel from './RightPanel';
import LeftPanel from './LeftPanel';
import { theme } from 'antd';
import { CSSProperties } from 'react';
const { useToken } = theme

const Layout = (props: {
  style?: CSSProperties
}) => {
  const { style } = props;
  const { token } = useToken()
  return (
    <>
      <div className="flex flex-col relative" style={{ ...style, background: token.colorBgContainer }}>
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
