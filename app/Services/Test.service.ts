import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Test } from '../Recruitment/Test/Test';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as Rs from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { ConfigService } from '../config/config.service';
import { HandleError } from './HandleError.service';

export abstract class TestMethods{
    abstract saveTest(candidateID : number): Observable<Test[]>;
    abstract getTest(candidateID : number): Observable<Test[]>;
}

@Injectable()
export class TestService extends TestMethods {
  //private url = 'http://localhost:8088/api/Test';
  config: any;
  private url : any;
  
  constructor(private _http: Http,private configSrvc: ConfigService,
  private _handleError : HandleError) {
    super();
    console.log('Inside TestService');
    this.config = this.configSrvc.config;
    console.log('Configurations: '+ JSON.stringify(this.config));
    this.url = this.config['apiUrl'] + '';
  }  

  saveTest(candidateID : number): Observable<Test[]>
  {
    let headers    = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options    = new RequestOptions({ headers: headers }); // Create a request option
    return this._http
    .post(this.url, candidateID, options)
      .map((response : Response) => <Test> response.json())
      .do(data => console.log('All : ' + JSON.stringify(data)))
     .catch(res => this._handleError.handleError(res));
  }

  getTest(candidateID : number) : Observable<Test[]>
  {      
     return this._http.get(this.url, candidateID)
    .map((response : Response) => <Test> response.json())
    .do(data => console.log('All : ' + JSON.stringify(data)))
    .catch(res => this._handleError.handleError(res));
  }

  // private handleError(error: Response) {
  //   console.error('An error occurred', error);
  //   return Observable.throw(error.json().error || 'Server error');
  // }
}

@Injectable()
export class TestDummyService extends TestMethods {
  private url = 'app/Json/Test.json';
  
  constructor(private _http: Http) {
    super();
    console.log('Inside CandidateService');
  } 

  saveTest(candidateID : number): Observable<Test[]>
  {
    let headers    = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options    = new RequestOptions({ headers: headers }); // Create a request option
    return this._http
    .post(this.url, candidateID, options)
      .map((response : Response) => <Test> response.json())
      .do(data => console.log('All : ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getTest(candidateID : number) : Observable<Test[]>
  {      
     return this._http.get(this.url, candidateID)
    .map((response : Response) => <Test> response.json())
    .do(data => console.log('All : ' + JSON.stringify(data)))
    .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error('An error occurred', error);
    return Observable.throw(error.json().error || 'Server error');
  }
}