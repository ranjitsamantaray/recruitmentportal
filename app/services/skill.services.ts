import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Skill } from '../model/skill';

@Injectable()
export class SkillService {
  private url = 'http://localhost:8088/api/skill';

  constructor(private http: Http) { console.log('Inside SkillService');}

  getSkill(): Promise<Skill[]> {
    return this.http.get(this.url)
               .toPromise()
               .then(response => response.json().data as Skill[])
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
