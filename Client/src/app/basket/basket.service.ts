import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { IProduct } from '../shared/models/product';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  basUrl= environment.apiUrl;
  private basketSource= new BehaviorSubject<IBasket|null>(null);

  //add $ to know its an observable
  basket$=this.basketSource.asObservable();
  private basketTotalSource= new BehaviorSubject<IBasketTotals|null>(null);
  basketTotal$= this.basketTotalSource.asObservable();
  shipping= 0;


  constructor(private http: HttpClient) { }



  setShippingPrice(deliveryMethod: IDeliveryMethod){
    this.shipping = deliveryMethod.price;
    this.calculateTotals();
  }

  getBasket(id:string){
    return this.http.get<IBasket>(this.basUrl + 'basket?id=' + id)
    .pipe(
      map((basket : IBasket)=>{
        this.basketSource.next(basket);
        // console.log(this.getCurrentBasketValue())
        this.calculateTotals();
      })
    )
  }

  setBasket(basket:IBasket){
    return this.http.post<IBasket>(this.basUrl+ 'basket', basket).subscribe({
      next:(response:IBasket)=>{
        this.basketSource.next(response);
        // console.log(response);
        this.calculateTotals();
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  getCurrentBasketValue(){
    return this.basketSource['_value'];
  }

addItemToBasket(item:IProduct, quantity=1){
  const itemToAdd:IBasketItem=this.mapProductItemToBasketItem(item, quantity);
  const basket = this.getCurrentBasketValue() ?? this.createBasket();
  basket.items= this.addOrUpdateItem(basket.items, itemToAdd, quantity);
  this.setBasket(basket);
}

incrementItemQuantity(item:IBasketItem){
  const basket = this.getCurrentBasketValue();
  const foundItemIndex = basket.items.findIndex((x: { id: string; })=>x.id===item.id);
  basket.items[foundItemIndex].quantity++;
  this.setBasket(basket);
}

decrementItemQuantity(item:IBasketItem){
  const basket = this.getCurrentBasketValue();
  const foundItemIndex = basket.items.findIndex((x: { id: string; })=>x.id===item.id);
  if(basket.items[foundItemIndex].quantity>1){
    basket.items[foundItemIndex].quantity--;
    this.setBasket(basket);
  } else {
    this.removeItemFromBasket(item);
  }
}
  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if(basket.items.some((x: { id: string; })=>x.id===item.id)){
      basket.items = basket.items.filter((i: { id: string; })=>i.id !== item.id);
      if(basket.items.lengh > 0){
        this.setBasket(basket);
      } else{
        this.deleteBasket(basket)
      }
    }
  }

  deleteLocalBasket(id : string){
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }

  deleteBasket(basket: IBasket) {
    return this.http.delete(this.basUrl + "basket?id=" + basket.id).subscribe({
      next:()=>{
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem('basket_id')
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  private calculateTotals(){
    const basket = this.getCurrentBasketValue();
    const shipping = this.shipping;
    const subtotal= basket.items.reduce((a:any, b:any) => (b.price * b.quantity) + a, 0);
    const total = subtotal + shipping;
    this.basketTotalSource.next({shipping,total,subtotal})
  }

  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index= items.findIndex(i=>i.id === itemToAdd.id);
    if(index===-1){
      itemToAdd.quantity=quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity +=quantity;
    }
    return items;
  }



  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id:item.id,
      productName:item.name,
      price:item.price,
      pictureUrl:item.pictureUrl,
      quantity,
      brand:item.productBrand,
      type:item.productType
    }
  }

}





