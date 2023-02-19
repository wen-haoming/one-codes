import { proxy } from "valtio";

type CurrentState = {
  id?: string;
  panelMode: 'edit' | 'code';
  code: string;
};

export const currentState: CurrentState = proxy({
  panelMode: 'edit',
  code: ''
});
