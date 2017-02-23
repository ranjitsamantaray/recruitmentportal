import { Injectable } from '@angular/core';
import { Router, CanActivate ,ActivatedRouteSnapshot,RouterStateSnapshot,Params} from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import {Observable} from "rxjs/Rx";
import {AuthUserMethods} from "./Services/AuthenticateUser.service"


@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot) {
      if(JSON.parse(localStorage.getItem('id_token')).token != null){
        // const url:string =state.url;
        // if ( (url == '/test' || url == '/testsuccess' || url == '/registrationsuccess') && localStorage.getItem('Authlevel')==='admin'){
        //  // const url2 :any =route.parent;
          
        //   alert("Not allowed");

        //   return false;
        // }
        // if ((url == '/summary' || url == '/evaluation/1' || url == '/registrationsuccess') && localStorage.getItem('Authlevel')==='candidate') {
        //   this.router.navigate(['/test']);
        //   alert("Not allowed");
        //   return false;
        // }
        // return true;
      }
       else {
        const url :string = state.url;
       // alert("Forbidden to this route!!!! LOGIN first"+url)
        if( url == '/test') {
         alert("Forbidden to this route!!!! LOGIN first");
         this.router.navigate(['/testlogin']);
         return false;
       }
      //  if(url == '/summary' || url == '/evaluation/1') {
      //    alert("Forbidden to this route!!!! LOGIN first");
      //    this.router.navigate(['/login']);
      //    return false;
      //  }
       //if (url == '/registrationsuccess' && localStorage.getItem('login_token') == ''){
       //  alert("Not allowed");
        // this.router.navigate(['/home']);
       //}
       
      
    // Check to see if a user has a valid JWT
   // if (tokenNotExpired()) {
      // If they do, return true and allow the user to load the home component
     // return true;
    }

    // If not, they redirect them to the login page
  // this.router.navigate(['/login']);
   // return false;
  //}
