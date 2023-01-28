import { proxy } from 'valtio';

export type IdSchema = {
  id: string;
  slot?: {
    id: string;
  }[];
}[];

export const idSchema = proxy<IdSchema>([]);
