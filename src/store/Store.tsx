import { DependencyConfig } from '@/App';
import { store } from '@/store';
import { useLocalStorageState } from 'ahooks';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';

export const Store = (props: {
  dependencyConfig: DependencyConfig
}) => {
  const { dependencyConfig } = props;
  
  const [schemaMapLocal, setSchemaMapLocal] = useLocalStorageState('schemaMap', {
    defaultValue: {}
  })
  const [idSchemaLocal, setIdSchemaLocal] = useLocalStorageState('idSchema', {
    defaultValue: []
  })

  // const [depsMapLocal, setDepsMapLocal] = useLocalStorageState('depsMap', {
  //   defaultValue: { "dependency": [], "depsConfig": {} }
  // })

  const schemaMapSnap = useSnapshot(store.schemaMap);
  const idSchemaSnap = useSnapshot(store.idSchema);
  
  useEffect(() => {
    setIdSchemaLocal(idSchemaSnap as any)
    setSchemaMapLocal(schemaMapSnap)
  }, [idSchemaSnap, schemaMapSnap])

  useEffect(() => {
    store.schemaMap = schemaMapLocal as any;
    store.dependencyConfig = dependencyConfig;
    store.idSchema = idSchemaLocal as any;
  }, [])

  return <></>
}
