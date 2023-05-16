import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product
  productQuantity: number = 1;
  removeItem = false;
  cartData:product|undefined;
  constructor(private activerout: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    let productId = this.activerout.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((result) => {
      this.productData = result

      let cartData = localStorage.getItem('localCart')
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: product) => productId == item.id.toString())
        if (items.length) {
          this.cartData=items[0]
          this.removeItem = true;
        }
        else {
          this.removeItem = false;
        }
      }
      let user = localStorage.getItem('user');
      if(user){
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);
        this.product.cartData.subscribe((result)=>{
        let item =  result.filter((item:product)=>productId?.toString()===item.productId?.toString());
        if(item.length){
          this.removeItem = true;
        }
        })
      }
        
    })
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    }
    else if (this.productQuantity > 20 && val === 'min') {
      this.productQuantity = this.productQuantity - 1;
    }
  }
  AddToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;

      if (!localStorage.getItem('user')) {

        this.product.localAddToCart(this.productData);
        this.removeItem = true;

      } else {
   
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...this.productData, userId, productId: this.productData.id,
        }
        delete cartData.id;

        this.product.addToCart(cartData).subscribe((result) => {

          if (result) {
            this.product.getCartList(userId);
            this.removeItem = true;
          }
        })
      }

    }
  }
  RemoveToCart(productId: number) {
    if (!localStorage.getItem('user')) {
    this.product.RemoveItemToCart(productId);
    this.removeItem = false;
    }
    else{
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
console.warn(this.cartData);
this.cartData && this.product.RemoveToCart(this.cartData.id).subscribe((result)=>{
if(result){
  this.product.getCartList(userId)
}
})
    }
    this.removeItem = false;
  }
}
