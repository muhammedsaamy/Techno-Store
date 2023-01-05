import { IProduct } from "./product";

export interface Ipagination{
  pageIndex:number;
  pageSiza:number;
  count:number;
  data:IProduct[];
}
