"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var Questions_1 = require('../Recruitment/Questions/Questions');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
//import * as Rs from 'rxjs/Rx';
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
var config_service_1 = require('../config/config.service');
var HandleError_service_1 = require('./HandleError.service');
var QuestionsMethods = (function () {
    function QuestionsMethods() {
    }
    return QuestionsMethods;
}());
exports.QuestionsMethods = QuestionsMethods;
var QuestionsService = (function (_super) {
    __extends(QuestionsService, _super);
    function QuestionsService(_http, configSrvc, _handleError) {
        _super.call(this);
        this._http = _http;
        this.configSrvc = configSrvc;
        this._handleError = _handleError;
        this.config = this.configSrvc.config;
        this.url1 = this.config['apiUrl'] + 'dbsecure-can/questionset';
        this.url2 = this.config['apiUrl'] + 'dbsecure-can/submit';
    }
    QuestionsService.prototype.getQuestions = function () {
        console.log('question url:' + this.url1);
        var token = JSON.parse(localStorage.getItem('id_token')).token;
        console.log('token:' + token);
        var headers = new http_1.Headers();
        headers.append('acc-token', "" + token);
        return this._http.get(this.url1, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (err) {
            console.log('Error returned from Question Service: ' + err);
            var r = JSON.parse(err._body);
            return Observable_1.Observable.throw(r.status);
        });
    };
    QuestionsService.prototype.saveQuestions = function (Answers) {
        var _this = this;
        var body = { "Answers": Answers };
        var token = JSON.parse(localStorage.getItem('id_token')).token;
        var headers = new http_1.Headers();
        headers.append('acc-token', "" + token);
        headers.append('Content-Type', 'application/json');
        return this._http
            .post(this.url2, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (res) { return _this._handleError.handleError(res); });
    };
    QuestionsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, config_service_1.ConfigService, HandleError_service_1.HandleError])
    ], QuestionsService);
    return QuestionsService;
}(QuestionsMethods));
exports.QuestionsService = QuestionsService;
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
// yet to implement
var QuestionsDummyService = (function (_super) {
    __extends(QuestionsDummyService, _super);
    function QuestionsDummyService(_http) {
        _super.call(this);
        this._http = _http;
        this.url = 'app/Json/Question.json';
    }
    QuestionsDummyService.prototype.getQuestions = function () {
        // return this._http.get(this.url)
        // .map((response : Response) => <Question[]> response.json())
        // .do(data => console.log('All : ' + JSON.stringify(data)))
        // .catch(this.handleError);
        return this._http.get(this.url).map(function (r) {
            var x = r.json();
            var Questions = new Array();
            for (var i = 0; i < x.length; i++) {
                var e = new Questions_1.Question(x[i].ID, x[i].Questions, '');
                Questions.push(e);
            }
            return Questions;
        });
    };
    QuestionsDummyService.prototype.saveQuestions = function (question) {
        this.questions.push(question);
        return Rs.Observable.from([this.questions]);
    };
    QuestionsDummyService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    QuestionsDummyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], QuestionsDummyService);
    return QuestionsDummyService;
}(QuestionsMethods));
exports.QuestionsDummyService = QuestionsDummyService;
//# sourceMappingURL=Questions.service.js.map