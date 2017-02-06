import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component ({
  selector: 'test',
  templateUrl: './app/test/test.html'
})

export class TestComponent {
  router: Router;

  constructor(_router: Router){
  this.router = _router;
  }

  gotoSaveTest() {
    this.router.navigate(['save']);
  }

  gotoReviewTest() {
    this.router.navigate(['review']);
  }

  gotoSubmitTest() {
    this.router.navigate(['testsuccess']);
  }
}
