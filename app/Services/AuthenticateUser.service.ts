import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Authentication } from '../Recruitment/Authentication/Authentication';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as Rs from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

export abstract class AuthUserMethods{
    abstract logout() : void;
    abstract login(user : Authentication) : Observable<boolean>;
    abstract checkCredentials() : void;    
}

@Injectable()
export class AuthUserService extends AuthUserMethods {
  private url = 'http://localhost:8088/api/logonuser';
  private user : Authentication;
  
  constructor(private _http: Http) {
    super();
    console.log('Inside Authenticate service');
  }  

  logout() {
    localStorage.removeItem("user");
    //this._router.navigate(['Login']);
  }

  login(user : Authentication) : Observable<boolean>
  {    
    var body = `username=${user.Email}&password=${user.Password}`;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this._http
    .post(this.url, body, { headers: headers })
    .map((response : Response) => <boolean> response.json())
    .do(data => console.log('All : ' + JSON.stringify(data)))
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
export class AuthUserDummyService extends AuthUserMethods {
  private url = 'http://localhost:8088/api/logon';
  //private can : Candidate;
  public users:Array<Authentication> = [
    new Authentication(1,"suraj.nd4444@gmail.com",
    "1234567",1),
    new Authentication(2,"kumar@danske.com",
    "1234567",1),
    new Authentication(3,"Akhil@danske.com",
    "1234567",1),
    new Authentication(4,"Ranjit@danske.com",
    "1234567",1)
  ];

  constructor(private _http: Http) {
    super();
    console.log('Inside Authentication service');
  }  

  logout() {
    localStorage.removeItem('user');
    //this._router.navigate(['Login']);
  }

  login(user : Authentication) : Observable<boolean>
  {    
    var authenticatedUser = this.users.find(u => u.Email === user.Email);
    if (authenticatedUser && authenticatedUser.Password === user.Password){
      localStorage.setItem('user', JSON.stringify({ Email: authenticatedUser.Email, Password: authenticatedUser.Password }) );           
      return Rs.Observable.from([true]);
    }
    return Rs.Observable.from([false]);
 
  }
 //isLogin() : boolean
 //{
   
 //}
  checkCredentials(){
   // if (localStorage.getItem('user') === null){  
   if(localStorage.getItem('id_token') === null)
   return false;
   else return true;      
   // }
  } 

  private handleError(error: Response) {
    console.error('An error occurred', error);
    return Observable.throw(error.json().error || 'Server error');
  }
}


