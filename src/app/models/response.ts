import { IItem } from './item';

export interface IResponse {
  list: IItem[];
  total: number;
}
