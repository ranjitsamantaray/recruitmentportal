import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component ({
  selector: 'test-login',
  templateUrl: './app/test/test-login.html'
})

export class TestLoginComponent {
  router: Router;

  constructor(_router:Router){
    this.router = _router;
  }

  gotoTestPage(){
    this.router.navigate(['test']);
  }
}
