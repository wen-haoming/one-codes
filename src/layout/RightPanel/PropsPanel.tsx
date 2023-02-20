import FormRender from '@/components/FormRender';
import { currentState, schemaMapState } from '@/store';
import { useMemo } from 'react';
import { useSnapshot } from 'valtio';

function PropsPanel() {
  const id = useSnapshot(currentState).id;
  const schemaMapSnap = useSnapshot(schemaMapState).schemaMap;
  const { formPropsConfig = {}, defaultProps = {} } = schemaMapSnap[id!] || {}

  const formPropsConfigMemo = useMemo(() => JSON.parse(JSON.stringify(formPropsConfig)), [formPropsConfig])
  const defaultPropsMemo = useMemo(() => defaultProps, [defaultProps])

  if (!id) {
    return <div className='text-coolgray'>请选择组件~</div>
  }

  const valuesChange = (values: Record<string, any>) => {
    const getComponentItem = currentState.id && schemaMapState.schemaMap[currentState.id]
    if (getComponentItem) {
      getComponentItem.props = values;
    }
  }

  return <div className='p-x-10px'>
    <FormRender formPropsConfig={formPropsConfigMemo} defaultProps={defaultPropsMemo} onValuesChange={valuesChange} />
  </div>
}

export default PropsPanel
