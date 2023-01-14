import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ipagination } from '../shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl='https://localhost:7270/api/'
  constructor(private http:HttpClient ) { }
  getProdcts(){
    return this.http.get<Ipagination>(this.baseUrl+'products?pageSize=50');
  }

}
