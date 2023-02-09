// import { FieldType, } from '@antd-one/components';
// import { Install as FormRenderInstall } from '@/layout/RightPanel'
import { proxy } from 'valtio';

export type Install = {
  typeName: string,
  icon?: string;
  children: {
    title?: string;
    component: any;
    componentName: string,
    configProps?: any[];
    isSlot?: boolean;
    defaultProps?: any;
  }[]
}[]

export const globalProps = proxy<{
  install: Install
}>({ install: [] })

