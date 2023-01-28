import { proxy } from 'valtio';

export type Install = {
  typeName: string,
  icon?: string;
  children: {
    title?:string;
    component:any;
    configProps?:any[];
    isSlot?:boolean;
    defaultProps?:any;
  }[]
}[]

export const globalProps = proxy<{
  install: Install
}>({install:[]})

