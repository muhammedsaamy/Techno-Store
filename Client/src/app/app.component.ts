import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Tecno';

  constructor(private basketService:BasketService, private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }

  loadCurrentUser(){
    const token = localStorage.getItem('token');
    if(token){
      this.accountService.loadCurrentUser(token).subscribe({
        next:()=>{
          console.log("loaded user")},
          error:(err)=>{console.log(err)
        }
      })
    }
  }

  loadBasket(){
    const basketId= localStorage.getItem('basket_id');
    if(basketId){
      this.basketService.getBasket(basketId).subscribe({
        next:(response)=>{
          console.log('initialize basket')
        },
        error:(error)=>{
          console.log(error)
        }
      })
    }
  }
}
