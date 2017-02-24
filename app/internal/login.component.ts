import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../Services/Login.service';
import { Candidate } from '../Recruitment/Candidate/Candidate';

@Component ({
  selector: 'login',
  templateUrl: './app/internal/login.html'
})

export class LoginComponent implements OnInit {
  router: Router;
  public email : string='';
  public pwd : string='';
  errorMessage : string;
  public loginTrue : boolean;
  public can : Candidate;
  public token : string='';
  public t:string;
  
  constructor(
    private _authService: Login,
    _router:Router){ this.router = _router;
       }

  ngOnInit() {    
    // this.can = new Candidate(null,'','','',null,'',null,'',null,'',null);
  }

  gotoSuccessPage(){
    if (this.email==''){
      this.errorMessage="please enter your Email id";
    }
    else if (this.pwd==''){
      this.errorMessage="Please enter your password";
    }
    else{
     this._authService.login(this.email,this.pwd)
     .subscribe(
        response => {
          this.token=response;
          localStorage.setItem('id_token', this.token);
          this.t=localStorage.getItem('id_token'); 
          localStorage.setItem('Authlevel', 'admin');
          this.router.navigate(['summary']);        
        },
        error => {
          this.errorMessage = 'Incorrect email or password';
        }
      );      
    }
  }

  
}
     