import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../Services/Login.service';
import { Candidate } from '../Recruitment/Candidate/Candidate';
import {LoginInfo} from '../Recruitment/Login/Logininfo'

@Component ({
  selector: 'testlogin',
  templateUrl: './app/test/test-login.html'
})

export class TestLoginComponent implements OnInit {
  router: Router;
  public email : string='';
  public pwd : string='';
  errorMessage : string;
  public token :any;
  
  
  constructor(
    private _authService: Login,_router:Router){ this.router = _router; }

  ngOnInit() {    
   
  }

  gotoTestPage(){
    if (this.email==''){
      this.errorMessage="please enter your Email id";
    }
    else if (this.pwd==''){
      this.errorMessage="Please enter your password";
    }
    else{
     this.token=this._authService.login(this.email,this.pwd)
     .subscribe(result => {

                if (result === 't') 
                    
                    this.router.navigate(['/test']);
                   
     }, err => {
                   
                   this.errorMessage=err;
                   
                });
    }
    }
  }
     