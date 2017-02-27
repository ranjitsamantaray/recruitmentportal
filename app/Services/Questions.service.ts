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
import { HandleError } from './HandleError.service';

export abstract class QuestionsMethods{
    abstract getQuestions(): Observable<Question[]>;
    abstract saveQuestions(question:Question[]): Observable<string>;
}

@Injectable()
export class QuestionsService extends QuestionsMethods {
  config: any;
  private url1 : any;
  private url2: any;
  
  constructor(private _http: Http,private configSrvc: ConfigService,
  private _handleError : HandleError) {
    super();
    //console.log('Inside QuestionService');
    this.config = this.configSrvc.config;
    //console.log('Configurations: '+ JSON.stringify(this.config));
    this.url1 = this.config['apiUrl'] + 'dbsecure-can/questionset';
    this.url2 = this.config['apiUrl'] + 'dbsecure-can/submit';
  }  

  getQuestions(): Observable<Question[]>
  {
    var token=JSON.parse(localStorage.getItem('id_token')).token;
    //var key =JSON.parse(localStorage.getItem('id_token')).key;
    var headers = new Headers();
    headers.append('acc-token',`${token}`);
   // headers.append('key',`${key}`);
    return this._http.get(this.url1,{ headers: headers })
    .map((response : Response) => <Question[]> response.json())
    //.do(data => console.log('All : ' + JSON.stringify(data)))
    .catch(res => this._handleError.handleError(res));

    // return this._http.get(this.url,{ headers: headers }).map((r) =>
    //  {
    //    let x = r.json();
    //    let Questions : Question[];
    //    for(let i = 0; i < x.length ; i++)
    //     {
    //       let e: Question = new Question(
    //         x[i].ID,
    //         x[i].Questions,
    //         ''
    //       );
    //       Questions.push(e);  
    //  }
    //  console.log(Questions);
    //  return Questions ;
    //  });
  }

  // yet to implement
  saveQuestions(Answers:Question[]): Observable<string>
  {
    //var ans = Answers{ar:Answers};
   // console.log(JSON.stringify(Answers.length));
    //var body=`Questions=${Answers[1].Questions}&ID=${Answers[1].ID}&Answers=${Answers[1].Answers}`;
    //var body = "this is body" ;
  //  var body =`Answers=${JSON.stringify(Answers)}`;
  let body = {"Answers": Answers};
  console.log(body);
  //var body =JSON.stringify(Answers);
  // var body =JSON.stringify({Answers :Answers});
  // console.log(JSON.stringify(Answers[1]));
  //  console.log(JSON.stringify(body));
  //var body= `Answers=${Answers}`;
    var token=JSON.parse(localStorage.getItem('id_token')).token;
    //var key =JSON.parse(localStorage.getItem('id_token')).key;
    var headers = new Headers();
    headers.append('acc-token',`${token}`);
    //headers.append('key',`${key}`);
    headers.append('Content-Type', 'application/json');

    return this._http
    .post(this.url2, body, {headers: headers} )
      .map((response : Response) => <String> response.json())
      .do(data => console.log('All : ' + JSON.stringify(data)))
      .catch(res => this._handleError.handleError(res));
  }

  // private handleError(error: Response) {
  //   console.error('An error occurred', error);
  //   return Observable.throw(error.json().error || 'Server error');
  // }
}

@Injectable()
export class QuestionsDummyService extends QuestionsMethods { 
  private url = 'app/Json/Question.json';
  private questions : Array<Question>;
  constructor(private _http: Http) {
    super();
  }

  getQuestions(): Observable<Question[]>
  {
    // return this._http.get(this.url)
    // .map((response : Response) => <Question[]> response.json())
    // .do(data => console.log('All : ' + JSON.stringify(data)))
    // .catch(this.handleError);

     return this._http.get(this.url).map((r) =>
     {
       let x = r.json();
       let Questions : Array<Question> = new Array<Question>();
       for(let i = 0; i < x.length ; i++)
        {
          let e: Question = new Question(
            x[i].ID,
            x[i].Questions,
            ''
          );
          Questions.push(e);  
     }
     return Questions;
     });
  }

  saveQuestions(question:Question) : Observable<Question[]>{
    this.questions.push(question);
    return Rs.Observable.from([this.questions]);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}