import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent  implements OnInit{

  constructor( private product :ProductService){}
  orderData:order[]|undefined;
  ngOnInit(): void {
     this.getOrderList()
    
  }
 
  cancelOrder(orderId:number|undefined){
orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
  this.product.orderList().subscribe((result)=>{
    this.orderData=result;
  })
  })

}
 getOrderList(){
  this.product.orderList().subscribe((result)=>{
    this.orderData=result ;
  })
 }

}
