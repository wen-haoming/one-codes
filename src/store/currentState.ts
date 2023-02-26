import { proxy } from "valtio";

type CurrentState = {
  id?: string;
  panelMode: 'edit' | 'code';
  code: string;
  theme:'light'|'dark'
};

export const currentState: CurrentState = proxy({
  panelMode: 'edit',
  code: '',
  theme:'light'
});
