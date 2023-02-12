import App from './App';
import { createRoot } from 'react-dom/client';
import 'uno.css';

// import { TableFormRender } from '@antd-one/components';
// import Columns from './Columns'
// import { ProFormText, ProForm, QueryFilter, ProFormDatePicker, ProFormCheckbox, ProFormRadio, ProFormTextArea } from '@ant-design/pro-components'
// import { Button, Card, Input, Modal } from 'antd'

const container = document.getElementById('root');

const random = () => Math.floor(Math.random() * 100000).toString(16);

if (container) {
  const root = createRoot(container);
  root.render(<App  />)
}
