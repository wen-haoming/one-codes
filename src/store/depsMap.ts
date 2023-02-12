import { DependencyItem } from '@/layout/LeftPanel';
import { ModuleComponent } from '@/layout/LeftPanel/ConfigModal';
import { proxy, } from 'valtio';
import { watch } from 'valtio/utils'

export const depsMap = proxy<{ dependency: DependencyItem[], depsConfig: Record<string, ModuleComponent> }>({ dependency: [], depsConfig: {} })

// watch((get) => {
//   get(depsMap);
//   localStorage.setItem('depsMap', JSON.stringify(depsMap))
// })
