import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Ipagination } from './shared/models/pagination';
import { IProduct } from './shared/models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Tecno';
  products?:IProduct[]

  constructor(private http:HttpClient) {}

  ngOnInit(): void {
    this.http.get("https://localhost:7270/api/products?pageSize=50").subscribe({next:(response:Ipagination)=>{
    console.log(response)
    this.products=response.data
    }, error:(err:any)=>{
      console.log(err)
    }})
  }
}
