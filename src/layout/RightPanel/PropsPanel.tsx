import FormRender from '@/components/FormRender';
import { currentState, idSchemaState, schemaMapState } from '@/store';
import { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import getVal from 'lodash.get'

function PropsPanel() {
  const id = useSnapshot(currentState).id;
  const schemaMapSnap = useSnapshot(schemaMapState).schemaMap;
  const path = schemaMapSnap[id!]?.path

  const formPropsConfigMemo = useMemo(() => {
    let formPropsConfig = {};
    if (path && getVal(idSchemaState.idSchema, path)) {
      formPropsConfig = getVal(idSchemaState.idSchema, path).formPropsConfig;
    }
    return JSON.parse(JSON.stringify(formPropsConfig))
  }, [id])

  const defaultPropsMemo = useMemo(() => {
    let props = {};
    if (path && getVal(idSchemaState.idSchema, path)) {
      const { defaultProps, props: compProps } = getVal(idSchemaState.idSchema, path)
      props = {
        ...defaultProps, ...compProps
      }
    }
    return props
  }, [id])

  if (!id) {
    return <div className='text-coolgray'>请选择组件~</div>
  }

  const valuesChange = (values: Record<string, any>) => {
    const path = currentState.id && schemaMapState.schemaMap[currentState.id].path;
    const getComponentItem = getVal(idSchemaState.idSchema, path)
    if (getComponentItem) {
      getComponentItem.props = values;
    }
  }

  return <div className='p-x-10px'>
    <FormRender formPropsConfig={formPropsConfigMemo} defaultProps={defaultPropsMemo} onValuesChange={valuesChange} />
  </div>
}

export default PropsPanel
