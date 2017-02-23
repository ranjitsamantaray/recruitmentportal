import { Component } from '@angular/core';
import {Router} from '@angular/router'
@Component ({
  selector: 'success',
  templateUrl: './app/welcome/registrationsuccess.html'
})

export class RegistrationSuccessComponent {

//public login_token:string;

constructor(private router:Router){
 // this.login_token=localStorage.getItem('login_token');

}
login(){
//localStorage.removeItem('login_token');
//this.router.navigate(['/testlogin']);
}
}
