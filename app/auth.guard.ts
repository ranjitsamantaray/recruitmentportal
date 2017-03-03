import { Injectable } from '@angular/core';
import { Router, CanActivate ,ActivatedRouteSnapshot,RouterStateSnapshot,Params} from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import {Observable} from "rxjs/Rx";
import {AuthUserMethods} from "./Services/AuthenticateUser.service"


@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot) {
    if (localStorage.getItem('id_token')) {
           
            return true;
        }

       this.router.navigate(['/testlogin']);
        return false;
    }
  }

 