import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router,private http:HttpClient) { }

  isAuthenticated():boolean{
    if (sessionStorage.getItem('token')!==null) {
        return true;
    }
    return false;
  }

  canAccess(){
    if (!this.isAuthenticated()) {
        //redirect to login
        this.router.navigate(['/login']);
    }
  }
  canAuthenticate(){
    if (this.isAuthenticated()) {
      //redirect to dashboard
      this.router.navigate(['/dashboard']);
    }
  }

  register(name:string,email:string,password:string){
      //send data to register api (firebase)
     return this.http
      .post<{idToken:string}>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBUfoSaDiNO8zw0DFthC9gPzrbR421CKbs',
          {displayName:name,email,password}
      );
  }

  storeToken(token:string){
      sessionStorage.setItem('token',token);
  }

  login(email:string,password:string){
    //send data to login api (firebase)
      return this.http
      .post<{idToken:string}>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBUfoSaDiNO8zw0DFthC9gPzrbR421CKbs',
            {email,password}
      );
  }

  booktickets(name:string,email:string,location:string,destination:string){
    //send data to login api (firebase)
      return this.http
      .post<{idToken:string}>(
          'http://localhost:4200/booktickets',
            {name,email,location,destination}
      );
  }

  detail(){
    let token = sessionStorage.getItem('token');

    return this.http.post<{users:Array<{localId:string,displayName:string}>}>(
        'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBUfoSaDiNO8zw0DFthC9gPzrbR421CKbs',
        {idToken:token}
    );
  }

  removeToken(){
    sessionStorage.removeItem('token');
  }



}
