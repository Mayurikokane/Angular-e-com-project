import { Component, OnInit } from '@angular/core';
import { SignUp, cart, login, product } from '../data-type';
import { UserService } from '../service/user.service';
import { ProductService } from '../service/product.service';


@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit{
  showLogin:boolean=true;
  authError:string="";
constructor(private user :UserService ,private product:ProductService){}

ngOnInit(): void {
  this.user.userAuthReload();
}

submit(data:SignUp){
this.user.userSignUp(data)
}
Login(data:login){
this.user.userLogin(data);
this.user.InvalidUserAuth. subscribe((result)=>{
  console.warn(result);
  if(result){
    this.authError="please enter the valid details";
  }
  else
  {
   this.localCartToRemoteCart()
  }
})
}
openLogin(){
  this.showLogin=true;
}
openSignUp(){
  this.showLogin=false;
}
localCartToRemoteCart(){
let data=localStorage.getItem('localCart');
let user =localStorage.getItem('user');
let userId =user && JSON.parse(user).id;
if(data){
  let cartDataList :product[]=JSON.parse(data);


  cartDataList.forEach((product : product , index)=>{
    let cartData :cart={
      ...product,productId:product.id,userId,
    };
    delete cartData.id;
   setTimeout(() => {
    this.product.addToCart(cartData).subscribe((result)=>{
      if(result){
        console.warn("Item store in DB");
      }
    })
    if(cartDataList.length===index+1){
      localStorage.removeItem('localCart')
    }
   }, 500);
      
    });
 
}
setTimeout(() => {
  this.product.getCartList(userId)
}, 2000);
}
}
