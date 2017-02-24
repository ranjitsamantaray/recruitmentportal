import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as Rs from 'rxjs/Rx';
import 'rxjs/add/operator/do';

@Injectable()
export class ConfigService {
  public config: any;
  constructor(private http: Http) {
    console.log('ctor for ConfigService called.');
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
    console.log('Inside Load');
    // var p1 = new Promise((resolve) => { 
    //   this.http.get('app/config/appConfig.json').map(res => res.json())
    //     .subscribe(config => {
    //       console.log('Configuration loaded...........');
    //       this.config = config;
    //       resolve();
    //     });
    // });
    console.log(this.output);
    return new Promise((resolve) => {
      this.config = this.output;
      resolve();
    });
  
    // console.log(p1);
    // return p1;
  }

}