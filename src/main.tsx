import 'uno.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import { ProFormText, ProForm, QueryFilter } from '@ant-design/pro-components'

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(<App install={[
    {
      typeName: '表单组件',
      icon: '',
      children: [
        {
          component: ProFormText,
          isSlot: false,
          defaultProps: {
            label: 'abc',
            name: 'abc'
          }
        }, {
          component: ProForm,
          isSlot: true,
          defaultProps: {
            layout: 'inline'
          }
        }, {
          component: QueryFilter,
          isSlot: true,
          defaultProps: {
            layout: 'inline'
          }
        }]
    }
  ]} />)
}
