import { store } from '@/store';
import { useLocalStorageState } from 'ahooks';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';

export const Store = () => {
  const [schemaMapLocal, setSchemaMapLocal] = useLocalStorageState('schemaMap', {
    defaultValue: {}
  })
  const [idSchemaLocal, setIdSchemaLocal] = useLocalStorageState('idSchema', {
    defaultValue: []
  })
  const [depsMapLocal, setDepsMapLocal] = useLocalStorageState('depsMap', {
    defaultValue: { "dependency": [], "depsConfig": {} }
  })

  const schemaMapSnap = useSnapshot(store.schemaMap);
  const depsMapSnap = useSnapshot(store.depsMap)
  const idSchemaSnap = useSnapshot(store.idSchema);
  useEffect(() => {
    setIdSchemaLocal(idSchemaSnap as any)
    setDepsMapLocal(depsMapSnap as any)
    setSchemaMapLocal(schemaMapSnap)
  }, [idSchemaSnap, schemaMapSnap, depsMapSnap])

  useEffect(() => {
    store.schemaMap = schemaMapLocal as any;
    store.depsMap = depsMapLocal as any;
    store.idSchema = idSchemaLocal as any;
  }, [])

  return <></>
}
