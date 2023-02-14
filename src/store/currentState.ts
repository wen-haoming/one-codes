import { proxy } from "valtio";

type CurrentState = {
  id?: string;
  panelMode: 'edit' | 'code';
};

export const currentState:CurrentState = proxy({
  panelMode: 'edit',
});
