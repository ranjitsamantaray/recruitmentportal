import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Candidate } from '../Recruitment/Candidate/Candidate';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as Rs from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

export abstract class AuthCandidateMethods{
    abstract logout() : void;
    abstract login(can : Candidate) : Observable<boolean>;
    abstract checkCredentials() : void;    
}

@Injectable()
export class AuthCandidateService extends AuthCandidateMethods {
  private url = 'http://localhost:8088/api/logon';
  private can : Candidate;
  
  constructor(private _http: Http) {
    super();
    
  }  

  logout() {
    //localStorage.removeItem("can");
    //this._router.navigate(['Login']);
  }

  login(can : Candidate) : Observable<boolean>
  {    
    var body = `username=${can.Email}&password=${can.Password}`;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this._http
    .post(this.url, body, { headers: headers })
    .map((response : Response) => <boolean> response.json())
   // .do(data => console.log('All : ' + JSON.stringify(data)))
    .catch(this.handleError);   
  }

  checkCredentials(){
    // if (localStorage.getItem("user") === null){
    //     //this._router.navigate(['Login']);
    // }
  } 

  private handleError(error: Response) {
    console.error('An error occurred', error);
    return Observable.throw(error.json().error || 'Server error');
  }
}

@Injectable()
export class AuthCandidateDummyService extends AuthCandidateMethods {
  private url = 'http://localhost:8088/api/logon';
  //private can : Candidate;
  public candidates:Array<Candidate> = [
    new Candidate(1,"Suraj","suraj.nd4444@gmail.com",
    "1234567",5,"",null,"","123456"),
    new Candidate(1,"Kumar","kumar@danske.com",
    "1234567",5,"",null,"","123456"),
    new Candidate(1,"Akhil","Akhil@danske.com",
    "1234567",5,"",null,"","123456"),
    new Candidate(1,"Ranjit","Ranjit@danske.com",
    "1234567",5,"",null,"","123456")
  ];

  constructor(private _http: Http) {
    super();
    console.log('Inside CandidateService');
  }  

  logout() {
    localStorage.removeItem('can');
    //this._router.navigate(['Login']);
  }

  login(can : Candidate) : Observable<boolean>
  {    
    var authenticatedUser = this.candidates.find(u => u.Email === can.Email);
    if (authenticatedUser && authenticatedUser.Password === can.Password){
      localStorage.setItem('can', JSON.stringify({ Email: authenticatedUser.Email, Password: authenticatedUser.Password }) );           
      return Rs.Observable.from([true]);
    }
    return Rs.Observable.from([false]);
 
  }

  checkCredentials(){
    if (localStorage.getItem('can') === null){
        //this._router.navigate(['Login']);
    }
  } 

  private handleError(error: Response) {
    console.error('An error occurred', error);
    return Observable.throw(error.json().error || 'Server error');
  }
}


