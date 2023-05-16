import { Component ,OnInit } from '@angular/core';
import { SellerService } from '../service/seller.service';
import { Router } from '@angular/router';
import { SignUs } from '../data-type';


@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
 constructor( private seller :SellerService ,private router :Router){}
 showLogin =false;
 authError:string ='';
 ngOnInit():void{
   this.seller.reloadeSeller()
 }
 signUp(data:SignUs):void{

  this.seller.userSignUp(data)
  }
login(data:SignUs):void{
// console.warn(data)
this.seller.userLogin(data)
this.seller.isLoginError.subscribe((iserror)=>{
  if(iserror){
this.authError="Email and password is not correct"
  }
})
}
openLogin(){
 this.showLogin = true
}
opensignUp(){
  this.showLogin = false
}
}
