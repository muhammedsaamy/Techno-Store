import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product?: IProduct;
  idParam?:number;

  constructor(private shopService:ShopService , private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProduct();
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
