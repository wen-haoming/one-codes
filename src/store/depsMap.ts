import { DependencyItem } from '@/layout/LeftPanel';
import { proxy } from 'valtio';

export const depsMap = proxy<{ dependency: DependencyItem[] }>({ dependency: [] })
