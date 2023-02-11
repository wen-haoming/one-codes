import { DependencyItem } from '@/layout/LeftPanel';
import { ModuleComponent } from '@/layout/LeftPanel/ConfigModal';
import { proxy } from 'valtio';

export const depsMap = proxy<{ dependency: DependencyItem[], depsConfig: Record<string, ModuleComponent> }>({ dependency: [], depsConfig: {} })
