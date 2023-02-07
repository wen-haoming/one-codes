import { FieldType, } from '@antd-one/components';
import { proxy } from 'valtio';
import { Install as FormRenderInstall } from '@/layout/RightPanel'

export type Install = {
  typeName: string,
  icon?: string;
  children: {
    title?: string;
    component: any;
    componentName: string,
    configProps?: FieldType<FormRenderInstall>[];
    isSlot?: boolean;
    defaultProps?: any;
  }[]
}[]

export const globalProps = proxy<{
  install: Install
}>({ install: [] })

