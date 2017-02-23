import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ConfigService {
  public config: any;
  constructor(private http: Http) {
    console.log('ctor for ConfigService called.')
  }

  load() {
    console.log('Inside Load');
    return new Promise((resolve) => resolve.json(JSON.stringify({"apiUrl": "http://recruitmentservices.azurewebsites.net/", "mode": "Development"})));
  }

}