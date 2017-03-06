import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { ConfigService } from '../config/config.service';
import { HandleError } from './HandleError.service';
import { Employee } from '../Recruitment/Employee/Employee';

export abstract class EmployeeMethods{
    abstract registerEmployee(employee:Employee): Observable<string>;
}

@Injectable()
export class EmployeeService extends EmployeeMethods {
  config: any;
  private url : any;

  constructor(private _http: Http, private configSrvc: ConfigService,
  private _handleError : HandleError)  {
    super();
    this.config = this.configSrvc.config;
    this.url = this.config['apiUrl'] + 'employee/register';
  }  

  registerEmployee(employee:Employee): Observable<string>
  {
    var body=`Name=${employee.Name}&Email=${employee.Email}&Skill=${employee.Skill}&Role=${employee.Role}`;
    var headers = new Headers();    
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this._http
    .post(this.url, body, {headers:headers})
      .map((response : Response) => <string> response.json())
      //.do(data => console.log('All : ' + JSON.stringify(data)))
      .catch(res => this._handleError.handleError(res)); 
  }
}
