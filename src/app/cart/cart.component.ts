import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cart?: Cart [];

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.readCart();
  }
  readCart(){
    console.log("prathap");
    this.cartService.readCart().subscribe(
      data=>{
        console.log(data);
       // this.cart=data["msg"];
      },
      error=>{
        console.log(error);
      })


  }

}
