import { Component, OnInit } from '@angular/core';

import { cart ,pricesummary } from '../data-type';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData:cart[]|undefined;
  pricesummary:pricesummary={
    price:0,
    discount:0,
    tax:0,
    delivery:0,
    total:0
}
 constructor(private product :ProductService ,private router :Router){}

 ngOnInit(): void {

   this.lodeDetails();
  }
  checkout(){
    this.router.navigate(['/checkout'])
  }
  removeToCart(cartId:number|undefined){
    

    cartId && this.cartData && this.product.RemoveToCart(cartId).subscribe(()=>{
this.lodeDetails();
})
}
lodeDetails(){
  this.product.currentCart().subscribe((result)=>{
    this.cartData=result;
    let price=0;
    result.forEach((item)=>{
      if(item.quantity){
        price=price + ( +item.price* +item.quantity)
      }
      
    });
    this.pricesummary.price=price;
    this.pricesummary.discount = price/10;
    this.pricesummary.tax= price/10;
    this.pricesummary.delivery=100;
    this.pricesummary.total=price+(price/10)+100-(price/10);
// if(this.cartData.length){
//   this.router.navigate(['/'])
// }

   });
}
}
