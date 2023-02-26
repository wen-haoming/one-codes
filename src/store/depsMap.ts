import { DependencyConfig } from '@/App';
import { proxy } from 'valtio';

export const dependencyConfigState: { dependencyConfigState: DependencyConfig } = proxy({ dependencyConfigState: [] })

