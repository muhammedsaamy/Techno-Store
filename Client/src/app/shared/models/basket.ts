import { v4 as uuidv4 } from 'uuid';
// const { v4: uuidv4 } = require('uuid');

  export interface IBasket {
    id: string;
    items: IBasketItem[];
}

  export interface IBasketItem {
      id: string;
      productName: string;
      price: number;
      quantity: number;
      pictureUrl: string;
      brand: string;
      type: string;
  }

export class Basket implements IBasket{
  id= uuidv4();
  items: IBasketItem[]=[];

}

