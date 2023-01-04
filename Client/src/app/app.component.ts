import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Tecno';
  products!:any[]

  constructor(private http:HttpClient) {}

  ngOnInit(): void {
    this.http.get("https://localhost:7270/api/products").subscribe({next:(response:any)=>{
    console.log(response)
    this.products=response.data
    },error:(err:any)=>{
      console.log(err)
    }})
  }
}
