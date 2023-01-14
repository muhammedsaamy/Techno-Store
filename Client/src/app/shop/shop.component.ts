import { Component, OnInit } from '@angular/core';
import { IBrand } from '../shared/models/brands';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products?:IProduct[];
  brands?:IBrand[];
  types?:IType[];
  constructor(private shopService:ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }
  getProducts(){
    this.shopService.getProdcts().subscribe({next:response=>{
      this.products=response.data;
    },error: error=>{
      console.log(error);
    }})
  }

  getBrands(){
    this.shopService.getBrands().subscribe({next:response=>{
      this.brands=response;
    },error: error=>{
      console.log(error);
    }})
  }

  getTypes(){
    this.shopService.getTypes().subscribe({next:response=>{
      this.types=response;
    },error: error=>{
      console.log(error);
    }})
  }



}
