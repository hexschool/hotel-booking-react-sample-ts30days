import { BaseObj } from './base.type.ts';

export type Culinary = Partial<BaseObj> & {
  title: string;
  description: string;
  diningTime: string;
  image: string;
}
