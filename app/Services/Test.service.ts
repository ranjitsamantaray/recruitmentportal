import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions, URLSearchParams  } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Eval } from '../Recruitment/Eval';
import { Test } from '../Recruitment/Test/Test';
import { Candidate } from '../Recruitment/Candidate/Candidate';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as Rs from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { ConfigService } from '../config/config.service';
import { HandleError } from './HandleError.service';

export abstract class TestMethods{
    abstract saveTest(canId : string): Observable<any>;
    abstract getTest(canId : string): Observable<Eval>;
}

@Injectable()
export class TestService extends TestMethods {  
  config: any;
  private url : any;
  private urlSave : any;
  
  constructor(private _http: Http,private configSrvc: ConfigService,
  private _handleError : HandleError) {
    super();
    console.log('Inside TestService');
    this.config = this.configSrvc.config;
    console.log('Configurations: '+ JSON.stringify(this.config));
    this.url = this.config['apiUrl'] + 'dbsecure-can/answers';
    this.urlSave = this.config['apiUrl'] + 'dbsecure-can/submiteval';
  }  

  saveTest(canId : string): Observable<any>
  {
    let token = localStorage.getItem('id_token');
    console.log('token:' + token);
    let headers = new Headers();
    headers.append('acc-token',`${token}`);    
    var body=`Email=${canId}`;    
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
    return this._http.post(this.urlSave, body, { headers: headers })
    .map((response : Response) => <any> response)
    //.do(data => console.log('All : ' + JSON.stringify(data)))     
    .catch(err =>{
      console.log('Error returned from evaluation Service: ' + err);     
      return Observable.throw(err.statusText);
    });
  }

  getTest(canId : string) : Observable<Eval>
  {  
    let token = localStorage.getItem('id_token');
    console.log('token:' + token);
    let params: URLSearchParams = new URLSearchParams();
    params.set("Email", canId);
    let headers = new Headers();
    headers.append('acc-token',`${token}`);
    let options = new RequestOptions({headers});    
    options.search = params;
    
    return this._http.get(this.url, options)    
    .map((r) => {
      let x = r.json();      
      let e : Eval = new Eval();
      let questions : Array<Test> = new Array<Test>();
      let cand : Candidate = new Candidate(x.recordset.ID,"",x.recordset.Name,"",x.recordset.Experience,
          x.recordset.Skill,null,x.recordset.Consultant_Name,x.recordset.Score,x.recordset.Status,"",x.recordset.Logic_Score);
      for(var i = 0;i< x.rec.length ; i++)
      {
         let s: Test = new Test(              
              x.rec[i].Question_ID,
              x.rec[i].Question,
              x.rec[i].Answer,
              ""              
         );
         questions.push(s);          
      }
      e.rec = questions;
      e.recordset = cand;             
      return e;
    })    
    //.do(data => console.log('All : ' + JSON.stringify(data)))
    .catch(err =>{
      console.log('Error returned from evaluation Service: ' + err);     
      return Observable.throw(err.statusText);
    });
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

  saveTest(candidateID : string): Observable<Test[]>
  {
    let headers    = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options    = new RequestOptions({ headers: headers }); // Create a request option
    return this._http
    .post(this.url, candidateID, options)
      .map((response : Response) => <Test> response.json())
      .do(data => console.log('All : ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getTest(canId : string) : Observable<Test[]>
  {  
    let token = localStorage.getItem('id_token');
    console.log('token:' + token);
    let params: URLSearchParams = new URLSearchParams();
    params.set("Email", canId);
    let headers = new Headers();
    headers.append('acc-token',`${token}`);
    let options = new RequestOptions({headers});    
    options.search = params;
    // let token = localStorage.getItem('id_token');
    // console.log('token:' + token);
    // let headers = new Headers();
    // headers.append('acc-token',`${token}`);    
    // var body=`Email=${canId}`;    
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
    return this._http.get(this.url, options)
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
    .do(data => console.log('All : ' + JSON.stringify(data)))
    .catch(err =>{
      console.log('Error returned from evaluation Service: ' + err);     
      return Observable.throw(err.statusText);
    });
  }

  private handleError(error: Response) {
    console.error('An error occurred', error);
    return Observable.throw(error.json().error || 'Server error');
  }
}