import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Skill } from '../Recruitment/Skill/Skill';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as Rs from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { ConfigService } from '../config/config.service';
import { HandleError } from './HandleError.service';

export abstract class SkillMethods{
    abstract getSkills(): Observable<Skill[]>;
    abstract saveSkill(skill:Skill): Observable<Skill[]>;
}

@Injectable()
export class SkillService extends SkillMethods {
  config: any;
  private url : any;
  
  constructor(private _http: Http,private configSrvc: ConfigService,
  private _handleError : HandleError) {
    super();
    console.log('Inside SkillService');
    this.config = this.configSrvc.config;
    console.log('Configurations: '+ JSON.stringify(this.config));
  //  this.url = this.config['apiUrl'] + 'recruitment/home';
	this.url = 'http://recruitmentservices.azurewebsites.net/recruitment/home';
  }  

  getSkills(): Observable<Skill[]>
  {
	console.log('Url:' + this.url);
    return this._http.get(this.url)
    .map((response : Response) => <Skill[]> response.json())
    .do(data => console.log('All : ' + JSON.stringify(data)))
    .catch(res => this._handleError.handleError(res));
  }

  // yet to implement
  saveSkill(skill:Skill): Observable<Array<Skill>>
  {
    let headers    = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options    = new RequestOptions({ headers: headers }); // Create a request option
    return this._http
    .post(this.url, skill, options)
      .map((response : Response) => <Skill> response.json())
      .do(data => console.log('All : ' + JSON.stringify(data)))
      .catch(res => this._handleError.handleError(res));
  }

  // private handleError(error: Response) {
  //   console.error('An error occurred', error);
  //   return Observable.throw(error.json().error || 'Server error');
  // }

  // getSkill(): Observable<Array<Skill>> {
  //   return this.http.get(this.url).map((r) => {
  //     let x = r.json();
  //     let skills : Array<Skill> = new Array<Skill>();
  //     for(let i = 0; i < x.length ; i++)
  //       {
  //         let s: Skill = new Skill(
  //           x[i].id,
  //           x[i].name
  //         );
  //         skills.push(s); 
  //       }
  //       return skills;
  //   }).catch(this.handleError);     

  // }
}

@Injectable()
export class SkillDummyService extends SkillMethods { 
  private url = 'app/Json/Skills.json';
  private skills : Array<Skill>;
  constructor(private _http: Http) {
    super();
  }

  getSkills(): Observable<Skill[]>
  {
    return this._http.get(this.url)
    .map((response : Response) => <Skill[]> response.json())
    //.do(data => console.log('All : ' + JSON.stringify(data)))
    .catch(this.handleError);
  }

  saveSkill(skill:Skill) : Observable<Skill[]>{
    this.skills.push(skill);
    return Rs.Observable.from([this.skills]);
  }

  // getSkill(): Promise<Skill[]> {
  //   return this.http.get(this.skills)
  //   .toPromise().then(response => response.json().data as Skill[])
  //              .catch(this.handleError);
  // }

  // saveSkill(skill:Skill)
  // {
  //   this.http.get(this.url)
  //              .toPromise()
  //              .then(response => response.json().data as Skill[])
  //              .catch(this.handleError);
  // }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}