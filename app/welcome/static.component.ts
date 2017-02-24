import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component ({
  selector: 'wel-static',
  templateUrl: './app/welcome/static.html'
})

export class WelcomeStaticComponent {
  router: Router;

  constructor(_router:Router){
    this.router = _router;
  }

  gotoLogInPage(){
    ///this.router.navigate(['login']);
  }
}
