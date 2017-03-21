import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Candidate } from '../Recruitment/Candidate/Candidate';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { ConfigService } from '../config/config.service';
import { HandleError } from './HandleError.service';

export abstract class SummaryMethods{
    abstract getSummary(): Observable<Candidate[]>;
}

@Injectable()
export class SummaryService extends SummaryMethods {  
  config: any;
  private url : any;
  
  constructor(private _http: Http,private configSrvc: ConfigService,
  private _handleError : HandleError) {
    super();
    this.config = this.configSrvc.config;
    this.url = this.config['apiUrl'] + 'dbsecure-can/summary';
  }  


  getSummary(): Observable<Candidate[]>
  {
    let token = localStorage.getItem('id_token');
    let headers = new Headers();
    headers.append('acc-token',`${token}`);    
    
    return this._http.get(this.url, { headers: headers })
    .map((r) => {
      let x = r.json();
      let candidates : Array<Candidate> = new Array<Candidate>();
      for(var i = 0;i< x.length ; i++)
      {
         let s: Candidate = new Candidate(
              x[i].ID,
              x[i].Email,
              x[i].Name,
              "",
              x[i].Experience,
              x[i].Skill,
              x[i].Registration_Date,
              x[i].Consultant_Name,
              x[i].Score,
              x[i].Status,
              "",
              x[i].Logic_Score
         );
         candidates.push(s); 
      }
      return candidates;      
    })    
    .catch(err =>{
          
      return Observable.throw(err.statusText);
    });
  }
}

@Injectable()
export class SummayDummyService extends SummaryMethods { 
  private url = 'app/Json/Candidate.json';
  private questions : Array<Candidate>;
  constructor(private _http: Http) {
    super();
  }

  getSummary(): Observable<Candidate[]>
  {
    let token = localStorage.getItem('id_token');
    console.log('token:' + token);
    let headers = new Headers();
    headers.append('acc-token',`${token}`);

    return this._http.get(this.url, { headers: headers })
    .map((response : Response) => <Candidate[]> response.json())
    .do(data => console.log('All : ' + JSON.stringify(data)))
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