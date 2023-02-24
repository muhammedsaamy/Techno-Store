import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasketItem } from 'src/app/shared/models/basket';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product!: IProduct;
  idParam?:number;
  quantity=1;

  constructor(private shopService:ShopService , private activatedRoute : ActivatedRoute , private basketService:BasketService) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  addItemToBasket(){
    this.basketService.addItemToBasket(this.product,this.quantity)
  }

  incrementQuantity(){
    this.quantity++;
  }

  decrementQuantity(){
    if(this.quantity>1){
      this.quantity--;
    }
  }

  loadProduct()
  {
    this.idParam=+this.activatedRoute.snapshot.paramMap.get('id')!;
    this.shopService.getProduct(this.idParam).subscribe(
      {
        next:(product)=>{this.product=product},
        error:(err)=>{console.log(err)}
      })
  }
}
