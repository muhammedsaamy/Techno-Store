import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBasket } from '../shared/models/basket';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  basUrl= environment.apiUrl;
  private basketSource= new BehaviorSubject<IBasket|null>(null);

  //add $ to know its an observable
  basket$=this.basketSource.asObservable();

  constructor(private http: HttpClient) { }

  getBasket(id:string){
    return this.http.get<IBasket>(this.basUrl + 'basket?id=' + id)
    .pipe(
      map((basket : IBasket)=>{
        this.basketSource.next(basket);
      })
    )
  }

  setBasket(basket:IBasket){
    return this.http.post<IBasket>(this.basUrl+ 'basket', basket).subscribe({
      next:(response:IBasket)=>{
        this.basketSource.next(response)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }



}



