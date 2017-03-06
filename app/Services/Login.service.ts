import { contentHeaders } from '../header';
import 'rxjs/add/operator/map';
//import * as Rs from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import {LoginInfo} from '../Recruitment/Login/Logininfo'
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../config/config.service';
import { HandleError } from './HandleError.service';

export abstract class Login{
    abstract login(email : string, pwd : string): Observable<string>;
}

@Injectable()
export class LoginReal extends Login {
  config: any;
  private url : any;

  constructor(private _http: Http,private configSrvc: ConfigService,
  private _handleError : HandleError) {
    super();
    this.config = this.configSrvc.config;
    this.url = this.config['apiUrl'] + 'login/auth';
  }


  login(Email : string, Password : string): Observable<string> {
    var body = `Email=${Email}&Password=${Password}`;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this._http
     .post(this.url, body, {headers:headers})
       .map((response: Response) => {
                let token = response.json() && response.json().Token;
                if (token) {
                    localStorage.setItem('id_token',response.json().Token);
                   return "t";
                }
       }).catch(e => {
         let r = JSON.parse(e._body);
         return Observable.throw(r.status);
       });

  }
}

@Injectable()
export class LoginDummy extends Login {
  private url = 'http://localhost:8088/api/login';
  constructor(private _http: Http) {
    super();
    console.log('Inside CandidateService');
  }


  login(email : string, pwd : string): Observable<string> {
     // let token:any;
    return Rs.Observable.from(["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ"]);
      //localStorage.setItem('currentUser',token);
      //return token;
  }

  private handleError(error: Response) {
    console.error('An error occurred', error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
