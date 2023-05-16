import { EventEmitter, Injectable } from '@angular/core';
import { SignUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { login } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http :HttpClient ,private route :Router) { }
  InvalidUserAuth=new EventEmitter<boolean>(false)
  userSignUp(user:SignUp){
    this.http.post("http://localhost:3000/Users",user,{observe:'response'}).subscribe((result)=>{
    console.warn(result);
    if(result){
      localStorage.setItem('user',JSON.stringify(result.body));
      this.route.navigate(['/'])
    }
    })
  }
  userLogin(data:login){
    this.http.get<SignUp[]>(` http://localhost:3000/Users?email=${data.email}&password=${data.Password}`,{observe:'response'}).subscribe((result)=>{  
      if(result && result.body?.length){
        this.InvalidUserAuth.emit(false);
        localStorage.setItem('user',JSON.stringify(result.body[0]));
        this.route.navigate(['/'])
    }
  else{
 this.InvalidUserAuth.emit(true);
  }})
}

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.route.navigate(['/']);
    }
  }
}
