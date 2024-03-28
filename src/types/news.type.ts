import { BaseObj } from './base.type.ts';

export type News = Partial<BaseObj> & {
  title: string;
  description: string;
  image: string;
}
