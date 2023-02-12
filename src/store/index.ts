import { proxy } from 'valtio';
import { currentState } from './currentState';
import { depsMap } from './depsMap';
import { idSchema } from './idSchema';
import { schemaMap } from './schemaMap';

export * from './currentState';
export * from './idSchema';
export * from './schemaMap';
export * from './depsMap'

export const store = proxy({
  idSchema,
  currentState,
  schemaMap,
  depsMap
})
