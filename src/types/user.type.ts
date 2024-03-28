import { BaseObj } from './base.type.ts';

export type Address = {
  zipcode: string;
  detail: string;
  county: string;
  city: string;
}

export type User = Partial<BaseObj> & {
  name: string;
  email: string;
  phone: string;
  birthday: string;
  address: Address;
}
