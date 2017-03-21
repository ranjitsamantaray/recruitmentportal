import { Injectable } from '@angular/core';
import {Consultancy} from '../Recruitment/Consultancy/Consultancy'
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HandleError } from './HandleError.service';
import { ConfigService } from '../config/config.service';
import * as Rs from 'rxjs/Rx';

@Injectable()
export class ConsultancyService{
  config: any;
  private url : any;

  constructor(private _http: Http,private _handleError : HandleError,
       private configSrvc: ConfigService,) {
        
         
         }
  con : Array<Consultancy>;
  getConsultancy(): Observable<Consultancy[]>
  {
    this.con = new Array<Consultancy>();
    this.con.push(new Consultancy(1,"Direct"));
    this.con.push(new Consultancy(2,"ABC"));
    this.con.push(new Consultancy(3,"A2HR"));
    this.con.push(new Consultancy(4,"Arista"));
    this.con.push(new Consultancy(5,"Armour"));
    this.con.push(new Consultancy(6,"CareerNet"));
    this.con.push(new Consultancy(7,"Covenant India"));
    this.con.push(new Consultancy(8,"Global Hunt"))
    
    return Rs.Observable.from([this.con]);

  }
}
  
 