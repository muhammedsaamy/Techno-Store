import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brands';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopService } from './shop.service';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
@ViewChild('search') searchTemp? : ElementRef;
  products?:IProduct[];
  brands?:IBrand[];
  types?:IType[];
  shopParams= new ShopParams();
  totalCount?:any
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
    this.shopService.getProducts(this.shopParams).subscribe({next:response=>{
      this.products=response?.data;
      this.shopParams.pageNumber=response?.pageIndex;
      this.shopParams.pageSize=response?.pageSize;
      this.totalCount=response?.count;
      console.log(this.totalCount)
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
  this.shopParams.brandId=brandId;
  this.shopParams.pageNumber=1;
  this.getProducts();
}

onTypeSelected(typeId:number){
this.shopParams.typeId=typeId;
this.shopParams.pageNumber=1;
this .getProducts();
}

onSortSelected(sort:string){
  this.shopParams.sort=sort;
  this.getProducts();
}

onPageChanged(event:any){
  if(this.shopParams.pageNumber != event.page){
    this.shopParams.pageNumber=event.page;
    this.getProducts();
  }
}

onSearch(){
  this.shopParams.search = this.searchTemp?.nativeElement.value;
  this.shopParams.pageNumber=1;
  this.getProducts();
}

onReset(){
  this.searchTemp!.nativeElement.value='';
  this.shopParams= new ShopParams();
  this.getProducts();
}

}
