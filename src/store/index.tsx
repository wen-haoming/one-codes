import Header from '../layout/Header';
import RenderPanel from '../layout/RenderPanel';
import RightPanel from '../layout/RightPanel';
import LeftPanel from '../layout/LeftPanel';
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
