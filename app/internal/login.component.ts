import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component ({
  selector: 'login',
  templateUrl: './app/internal/login.html'
})

export class LoginComponent {
  router: Router;

  constructor(_router: Router){
    this.router = _router;
  }

  gotoSuccessPage() {
    this.router.navigate(['registrationsuccess']);
  }
}
