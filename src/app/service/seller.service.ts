import { EventEmitter, Injectable } from '@angular/core';
import{HttpClient}from '@angular/common/http'
import {login, SignUs, } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import{Router}from '@angular/router'
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Injectable({
  providedIn: 'root'
})

export class SellerService {
 isSellerLoggedIn = new BehaviorSubject<boolean>(false)
 isLoginError = new EventEmitter<boolean>(false)
  constructor( private http :HttpClient ,private router :Router) { }

  userSignUp(data:SignUs){
 this.http.post("http://localhost:3000/seller",data ,
 {observe:'response'}).subscribe((result)=>{

  this.isSellerLoggedIn.next(true);
  localStorage.setItem('seller',JSON.stringify(result.body))
  this.router.navigate(['seller-home']);
 });
  }
  reloadeSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
  userLogin(data:login){
console.warn(data);
//api call code will be there
this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.Password}`,{observe:'response'}).subscribe((result:any)=>{
  console.warn(result);
if(result && result.body && result.body.length){
    localStorage.setItem('seller',JSON.stringify(result.body))
  this.router.navigate(['seller-home']);
  console.warn(" user logged in");
}
else
  console.warn("logged in failed");
  this.isLoginError.emit(true)

  // this.isSellerLoggedIn.next(true);
  // localStorage.setItem('seller',JSON.stringify(result.body))
  // this.router.navigate(['seller-home']);
 });
  }
}
