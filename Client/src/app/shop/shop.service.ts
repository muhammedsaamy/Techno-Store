import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IBrand } from '../shared/models/brands';
import { Ipagination } from '../shared/models/pagination';
import { IType } from '../shared/models/productType';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl='https://localhost:7270/api/'
  constructor(private http:HttpClient ) { }

  getProducts(brandId?:number, typeId?:number){
    let params=new HttpParams();
    if(brandId){
      params=params.append("brandId",brandId.toString())
    }

    if(typeId){
      params=params.append("typeId",typeId.toString())
    }

    return this.http.get<Ipagination>(this.baseUrl+'products',{observe:"response",params})
    .pipe(
      map(response=>{
        return response.body;
      })
    )
  }

  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl+'products/brands');
  }

  getTypes(){
    return this.http.get<IType[]>(this.baseUrl+'products/types');
  }

}
