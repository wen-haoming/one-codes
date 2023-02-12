type CurrentState = {
  id?: string;
  panelMode: 'edit' | 'code';
};

export const currentState:CurrentState = ({
  panelMode: 'edit',
});
