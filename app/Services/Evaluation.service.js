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
var Test_1 = require('../Recruitment/Test/Test');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
var config_service_1 = require('../config/config.service');
var HandleError_service_1 = require('./HandleError.service');
var EvaluateMethods = (function () {
    function EvaluateMethods() {
    }
    return EvaluateMethods;
}());
exports.EvaluateMethods = EvaluateMethods;
var EvaluateService = (function (_super) {
    __extends(EvaluateService, _super);
    function EvaluateService(_http, configSrvc, _handleError) {
        _super.call(this);
        this._http = _http;
        this.configSrvc = configSrvc;
        this._handleError = _handleError;
        this.config = this.configSrvc.config;
        this.url = this.config['apiUrl'] + 'dbsecure-can/answers';
    }
    EvaluateService.prototype.getAnswers = function (canId) {
        var token = localStorage.getItem('id_token');
        var headers = new http_1.Headers();
        headers.append('acc-token', "" + token);
        var body = "Email=" + canId;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url, { headers: headers })
            .map(function (r) {
            var x = r.json();
            var questions = new Array();
            for (var i = 0; i < x.length; i++) {
                var s = new Test_1.Test(x[i].Question_ID, x[i].Question, x[i].Answer, "");
                questions.push(s);
            }
            return questions;
        })
            .catch(function (err) {
            return Observable_1.Observable.throw(err.statusText);
        });
    };
    EvaluateService.prototype.saveAnswers = function (canId) {
        var token = localStorage.getItem('id_token');
        var headers = new http_1.Headers();
        headers.append('acc-token', "" + token);
        var body = "Email=" + canId;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (err) {
            return Observable_1.Observable.throw(err.statusText);
        });
    };
    EvaluateService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, config_service_1.ConfigService, HandleError_service_1.HandleError])
    ], EvaluateService);
    return EvaluateService;
}(EvaluateMethods));
exports.EvaluateService = EvaluateService;
var EvaluateDummyService = (function (_super) {
    __extends(EvaluateDummyService, _super);
    function EvaluateDummyService(_http) {
        _super.call(this);
        this._http = _http;
        this.url = 'app/Json/Candidate.json';
    }
    EvaluateDummyService.prototype.getAnswers = function (canId) {
        var token = localStorage.getItem('id_token');
        console.log('token:' + token);
        var headers = new http_1.Headers();
        headers.append('acc-token', "" + token);
        var body = "candidateId=" + canId;
        //console.log(body);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url, { headers: headers })
            .map(function (r) {
            var x = r.json();
            var questions = new Array();
            for (var i = 0; i < x.length; i++) {
                var s = new Question(x[i].Question_ID, x[i].Question, x[i].Answer);
                questions.push(s);
            }
            return questions;
        })
            .catch(function (err) {
            console.log('Error returned from summary Service: ' + err);
            return Observable_1.Observable.throw(err.statusText);
        });
    };
    EvaluateDummyService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    EvaluateDummyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], EvaluateDummyService);
    return EvaluateDummyService;
}(EvaluateMethods));
exports.EvaluateDummyService = EvaluateDummyService;
//# sourceMappingURL=Evaluation.service.js.map