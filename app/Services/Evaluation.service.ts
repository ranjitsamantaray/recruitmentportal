import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Candidate } from '../Recruitment/Candidate/Candidate';
import { Test } from '../Recruitment/Test/Test';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { ConfigService } from '../config/config.service';
import { HandleError } from './HandleError.service';

export abstract class EvaluateMethods{
    abstract getAnswers(canId : string): Observable<Test[]>;
    abstract saveAnswers(canId : string): Observable<string>;
}

@Injectable()
export class EvaluateService extends EvaluateMethods {  
  config: any;
  private url : any;
  
  constructor(private _http: Http,private configSrvc: ConfigService,
  private _handleError : HandleError) {
    super();
    console.log('Inside EvaluateService');
    this.config = this.configSrvc.config;
    console.log('Configurations: '+ JSON.stringify(this.config));
    this.url = this.config['apiUrl'] + 'dbsecure-can/answers';
  }  


  getAnswers(canId : string): Observable<Test[]>
  {
    let token = localStorage.getItem('id_token');
    console.log('token:' + token);
    let headers = new Headers();
    headers.append('acc-token',`${token}`);    
    var body=`Email=${canId}`;    
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
    return this._http.get(this.url, { headers: headers })
    .map((r) => {
      let x = r.json();
      let questions : Array<Test> = new Array<Test>();
      for(var i = 0;i< x.length ; i++)
      {
         let s: Test = new Test(              
              x[i].Question_ID,
              x[i].Question,
              x[i].Answer,
              ""              
         );
         questions.push(s); 
      }
      return questions;
    })    
    .catch(err =>{
      console.log('Error returned from evaluation Service: ' + err);     
      return Observable.throw(err.statusText);
    });
  }

  saveAnswers(canId : string): Observable<string>
  {
    let token = localStorage.getItem('id_token');
    console.log('token:' + token);
    let headers = new Headers();
    headers.append('acc-token',`${token}`);    
    var body=`Email=${canId}`;    
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
    return this._http.post(this.url, { headers: headers })
    .map((response : Response) => <Test> response.json())
    //.do(data => console.log('All : ' + JSON.stringify(data)))     
    .catch(err =>{
      console.log('Error returned from evaluation Service: ' + err);     
      return Observable.throw(err.statusText);
    });
  }
}

@Injectable()
export class EvaluateDummyService extends EvaluateMethods { 
  private url = 'app/Json/Candidate.json';
  private questions : Array<Candidate>;
  constructor(private _http: Http) {
    super();
  }

  getAnswers(canId : string): Observable<Question[]>
  {
    let token = localStorage.getItem('id_token');
    console.log('token:' + token);
    let headers = new Headers();
    headers.append('acc-token',`${token}`);    
    var body=`candidateId=${canId}`;
    //console.log(body);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
    return this._http.get(this.url,  { headers: headers })
    .map((r) => {
      let x = r.json();
      let questions : Array<Question> = new Array<Question>();
      for(var i = 0;i< x.length ; i++)
      {
         let s: Question = new Question(
              x[i].Question_ID,
              x[i].Question,
              x[i].Answer              
         );
         questions.push(s); 
      }
      return questions;
    })    
    .catch(err =>{
      console.log('Error returned from summary Service: ' + err);     
      return Observable.throw(err.statusText);
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}