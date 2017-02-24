import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Question } from '../Recruitment/Questions/Questions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as Rs from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { ConfigService } from '../config/config.service';

export abstract class HandleError{
    abstract handleError(error : any): Observable<any>;
}

@Injectable()
export class HandleErrorService extends HandleError {
  config: any;
  private url : any;
  
  constructor(private _http: Http, private configSrvc: ConfigService) {
    super();
    console.log('Inside HandleService');
    this.config = this.configSrvc.config;
    this.url = this.config['apiUrl'] + 'recruitment/log';
  }  

  handleError(error : any): Observable<any>
  {
    console.error('An error occurred', error);
    let headers    = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options    = new RequestOptions({ headers: headers }); // Create a request option
    this._http
      .post(this.url, error, options)
      .do(data => console.log('All : ' + JSON.stringify(data)));         
    return Observable.throw(error.json().error || 'Server error..');
  }  
}
