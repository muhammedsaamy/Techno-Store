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
  brandIdSelected:number=0;
  typeIdSelected:number=0;
  sortSelected='name'
  sortOptions=[
    {name:'Alphabetical', value:'name'},
    {name:'Price: Low to High', value:'priceAsc'},
    {name:'Price: High to Low', value:'priceDecs'}
  ];
  constructor(private shopService:ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }
  getProducts(){
    this.shopService.getProducts(this.brandIdSelected,this.typeIdSelected, this.sortSelected).subscribe({next:response=>{
      this.products=response?.data;
    },error: error=>{
      console.log(error);
    }})
  }

  getBrands(){
    this.shopService.getBrands().subscribe({next:response=>{
      this.brands=[{id:0,name:"All"}, ...response];
    },error: error=>{
      console.log(error);
    }})
  }

  getTypes  (){
    this.shopService.getTypes().subscribe({next:response=>{
      this.types=[{id:0,name:"All"}, ...response];
    },error: error=>{
      console.log(error);
    }})
  }

onBrandSelected(brandId:number){
  this.brandIdSelected=brandId;
  this.getProducts();
}

onTypeSelected(typeId:number){
this.typeIdSelected=typeId;
this .getProducts();
}

onSortSelected(sort:string){
  this.sortSelected=sort;
  this.getProducts();
}
}
