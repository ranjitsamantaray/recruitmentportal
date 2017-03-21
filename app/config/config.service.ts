import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import * as Rs from 'rxjs/Rx';
import 'rxjs/add/operator/do';

@Injectable()
export class ConfigService {
  public config: any;
  constructor(private http: Http) {
    this.obj = 
      {
        "apiUrl": "http://recruitmentservices.azurewebsites.net/",
        "mode": "Development"
      };
      this.output = <JSON>this.obj;
  }

  output: JSON;
  obj: any;

  load() {
    return new Promise((resolve) => {
      this.config = this.output;
      resolve();
    });

  }

}