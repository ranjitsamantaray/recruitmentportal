import { Injectable } from '@angular/core';
import {Consultancy} from '../Recruitment/Consultancy/Consultancy'
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HandleError } from './HandleError.service';
import { ConfigService } from '../config/config.service';

@Injectable()
export class ConsultancyService{
  config: any;
  private url : any;
  //private url2="http"
  constructor(private _http: Http,private _handleError : HandleError,
       private configSrvc: ConfigService,) {
        // console.log('Inside ConsultancyService');
         this.config = this.configSrvc.config;
        // console.log('Configurations: '+ JSON.stringify(this.config));
         this.url = 'app/Json/Consultancy.json';   
         }

  getConsultancy(): Observable<Consultancy[]>
  {
    return this._http.get(this.url)
    .map((response : Response) => <Consultancy[]> response.json())
    //.do(data => console.log('All : ' + JSON.stringify(data)))
    .catch(res => this._handleError.handleError(res));
  }
   }
  
 