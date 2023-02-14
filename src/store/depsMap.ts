import { DependencyConfig } from '@/App';
import { proxy, subscribe } from 'valtio';

export const dependencyConfigState: { dependencyConfigState: DependencyConfig } = proxy((JSON.parse(localStorage.getItem('depsMap') as any)) || { dependencyConfigState: [] })

subscribe(dependencyConfigState, () => {
  localStorage.setItem('depsMap', JSON.stringify(dependencyConfigState))
})
