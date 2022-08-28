import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Cart } from '../cart';
@Injectable({
  providedIn: 'root'
})
export class CartService {
private baseUri:string="http://localhost:3000";
private headers=new HttpHeaders().set('content-type','application/json')

  constructor(private http:HttpClient) { }

  createCart(cart:Cart){
    return this.http.post(this.baseUri+'/',{headers:this.headers});

  }
  readCart(){
    return this.http.get(this.baseUri+'/',{headers:this.headers});
  }
  updateCart(cart:Cart){
    return this.http.put(this.baseUri+'/:id',Cart,{headers:this.headers});
  }
  deleteCart(id:string){
    return this.http.post(this.baseUri+'/:id'+id,{headers:this.headers});
  }
}
