import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component ({
  selector: 'test-success',
  templateUrl: './app/test/test-success.html'
})

export class TestSuccessComponent {
  constructor(public router:Router){}
  logout(){
    localStorage.removeItem('id_token');
    this.router.navigate(['testlogin']);
  }
}
