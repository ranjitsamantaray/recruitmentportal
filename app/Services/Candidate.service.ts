import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Candidate } from '../Recruitment/Candidate/Candidate';
import {RegCandidate} from '../recruitment/registrationCandidate/RegCandidate'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
//import * as Rs from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { ConfigService } from '../config/config.service';
import { HandleError } from './HandleError.service';

export abstract class CandidateMethods{
    abstract getCandidates(): Observable<Candidate[]>;
    abstract saveCandidate(candidate:Candidate): Observable<string>;
    abstract getCandidate(Id : number): Observable<Candidate>;
    abstract candidateLogin(email : string, pwd : string): Observable<boolean>;
    abstract UploadResume(file : File, email : string) : Observable<any>;
}

@Injectable()
export class CandidateService extends CandidateMethods {
  config: any;
  private url : any;
  private urlResume:any;

  constructor(private _http: Http, private configSrvc: ConfigService,
  private _handleError : HandleError)  {
    super();
   // console.log('Inside CandidateService');
    this.config = this.configSrvc.config;
   // console.log('Configurations: '+ JSON.stringify(this.config));
    this.url = this.config['apiUrl'] + 'candidate/register';
    this.urlResume =this.config['apiUrl']+'candidate/upload';
  }  
   // yet to implement
  saveCandidate(candidate:Candidate): Observable<string>
  {
    var body=`Name=${candidate.Name}&Email=${candidate.Email}&Phone=${candidate.Phone}&Experience=${candidate.Experience}&Skill=${candidate.Skill}&Consultant_Name=${candidate.Consultancy}`; 
    var headers = new Headers();
    //console.log(body);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this._http
    .post(this.url, body, {headers:headers})
      .map((response : Response) => <string> response.json())
      //.do(data => console.log('All : ' + JSON.stringify(data)))
      .catch(res => this._handleError.handleError(res));
  }


  UploadResume(resume : File, email : string) : Observable<any>
  {    
    var formData = new FormData();
    formData.append('resume', resume, email);
    var headers = new Headers();
    
    return this._http
    .post(this.urlResume, formData, headers)
      .map((response : Response) => <any> response)
     // .do(data => console.log('All : ' + JSON.stringify(data)))
      .catch(err =>{
     return Observable.throw(err.statusText);
  });

}

  candidateLogin(email : string, pwd : string) : Observable<boolean>
  {
    var body = `username=${email}&password=${pwd}`;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this._http
    .post(this.url, body, { headers: headers })
    .map((response : Response) => <boolean> response.json())
    //.do(data => console.log('All : ' + JSON.stringify(data)))
    .catch(res => this._handleError.handleError(res)); 
  }

  getCandidates(): Observable<Candidate[]>
  {
    return this._http.get(this.url)
    .map((response : Response) => <Candidate[]> response.json())
    //.do(data => console.log('All : ' + JSON.stringify(data)))
    .catch(res => this._handleError.handleError(res));
  }

 
  getCandidate(Id : number) : Observable<Candidate>
  {      
     return this._http.get(this.url)
    .map((response : Response) => <Candidate> response.json())
    .do(data => console.log('All : ' + JSON.stringify(data))).filter(c => c.ID === Id).catch(res => this._handleError.handleError(res));
  }



}
@Injectable()
export class CandidateDummyService extends CandidateMethods {
  private url = 'app/Json/Candidate.json';
  private can : Candidate;

  public candidates:Array<Candidate> = [
    new Candidate(1,"Akhil","Akhil@a.com",
    "123456789",9,"BD",89,"BD","123456","XYZ",90),
    new Candidate(2,"Kumar","Kumar@a.com",
    "123456789",3,"Java",99,"BD","123456","XYZ",89),
    new Candidate(3,"Ranjith","Ranjith@a.com",
    "123456789",7,"Dotnet",null,"BD","123456","ABC",88),
    new Candidate(4,"Suraj","Suraj@a.com",
    "123456789",4,"Dotnet",87,"BD","123456","XYZ",87),
    new Candidate(5,"Nagaraj","Nagaraj@a.com",
    "123456789",2,"PLI",null,"BD","123456","LMN",86)
  ];
  
  constructor(private _http: Http) {
    super();
    console.log('Inside CandidateService');
  } 

  candidateLogin(email : string, pwd : string) : Observable<boolean>
  {
    return Rs.Observable.from([false]);   
  } 

  getCandidates(): Observable<Candidate[]>
  {
    return this._http.get(this.url)
    .map((response : Response) => <Candidate[]> response.json())
    .do(data => console.log('All : ' + JSON.stringify(data)))
    .catch(this.handleError);
  }

  // yet to implement
  saveCandidate(candidate:RegCandidate): Observable<RegCandidate>
  {
    // var jsonfile = require('jsonfile');
  
    // jsonfile.writeFile(this.url, candidate, function () {
    //   console.error("err")
    // });
    // return Rs.Observable.from([this.can]);
    let headers    = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options    = new RequestOptions({ headers: headers }); // Create a request option
    return this._http
    .post(this.url, candidate, options)
      .map((response : Response) => <RegCandidate> response.json())
      .do(data => console.log('All : ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  // save1Candidate (body: Object): Observable<Candidate> {
  //       let bodyString = JSON.stringify(body); // Stringify payload
  //       let headers    = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
  //       let options    = new RequestOptions({ headers: headers }); // Create a request option

  //       return this._http.post(this.url, body, options) // ...using post request
  //                        .map((res:Response) => res.json())
  //                        .catch(this.handleError);
  //   }  

  // getCandidate(Id : number) : Observable<Candidate>
  // {  
  //   this.getCandidates().subscribe(candidate => this.cans = candidate);    
  //   this.can = this.cans.find(c => c.ID === Id);
  //   return Rs.Observable.from([this.can]);
  // }

  getCandidate(Id : number) : Observable<Candidate>
  {  
    // this._http.get(this.url, Id)
    // .map((response : Response) => <Candidate> response.json())
    // .do(data => console.log('All : ' + JSON.stringify(data)))
    // .catch(this.handleError).subscribe(cans => this.candidates = cans);
    this.can = this.candidates.find(c => c.ID === Id);
    return Rs.Observable.from([this.can]);
    
  }

  private handleError(error: Response) {
    console.error('An error occurred', error);
    return Observable.throw(error.json().error || 'Server error');
  }
}