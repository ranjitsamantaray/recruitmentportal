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
var Candidate_1 = require('../Recruitment/Candidate/Candidate');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
var Rs = require('rxjs/Rx');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
var config_service_1 = require('../config/config.service');
var HandleError_service_1 = require('./HandleError.service');
var CandidateMethods = (function () {
    function CandidateMethods() {
    }
    return CandidateMethods;
}());
exports.CandidateMethods = CandidateMethods;
var CandidateService = (function (_super) {
    __extends(CandidateService, _super);
    function CandidateService(_http, configSrvc, _handleError) {
        _super.call(this);
        this._http = _http;
        this.configSrvc = configSrvc;
        this._handleError = _handleError;
        // console.log('Inside CandidateService');
        this.config = this.configSrvc.config;
        // console.log('Configurations: '+ JSON.stringify(this.config));
        this.url = this.config['apiUrl'] + 'candidate/register';
        this.urlResume = this.config['apiUrl'] + 'candidate/upload';
    }
    CandidateService.prototype.candidateLogin = function (email, pwd) {
        var _this = this;
        var body = "username=" + email + "&password=" + pwd;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http
            .post(this.url, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (res) { return _this._handleError.handleError(res); });
    };
    CandidateService.prototype.getCandidates = function () {
        var _this = this;
        return this._http.get(this.url)
            .map(function (response) { return response.json(); })
            .catch(function (res) { return _this._handleError.handleError(res); });
    };
    // yet to implement
    CandidateService.prototype.saveCandidate = function (candidate) {
        var _this = this;
        var body = "Name=" + candidate.Name + "&Email=" + candidate.Email + "&Phone=" + candidate.Phone + "&Experience=" + candidate.Experience + "&Skill=" + candidate.Skill + "&Consultant_Name=" + candidate.Consultancy;
        var headers = new http_1.Headers();
        //console.log(body);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        //let headers    = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        // let options    = new RequestOptions({ headers: headers }); // Create a request option
        return this._http
            .post(this.url, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log('All : ' + JSON.stringify(data)); })
            .catch(function (res) { return _this._handleError.handleError(res); });
    };
    CandidateService.prototype.getCandidate = function (Id) {
        var _this = this;
        return this._http.get(this.url)
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log('All : ' + JSON.stringify(data)); }).filter(function (c) { return c.ID === Id; }).catch(function (res) { return _this._handleError.handleError(res); });
    };
    //   private handleError(error: Response) {
    //     console.error('An error occurred', error);
    //     return Observable.throw(error.json().error || 'Server error');
    //   }
    // }
    CandidateService.prototype.UploadResume = function (resume, email) {
        var _this = this;
        var formData = new FormData();
        formData.append('resume', resume, email);
        var headers = new http_1.Headers();
        return this._http
            .post(this.urlResume, formData, headers)
            .map(function (response) { return response; })
            .catch(function (res) { return _this._handleError.handleError(res); });
    };
    CandidateService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, config_service_1.ConfigService, HandleError_service_1.HandleError])
    ], CandidateService);
    return CandidateService;
}(CandidateMethods));
exports.CandidateService = CandidateService;
var CandidateDummyService = (function (_super) {
    __extends(CandidateDummyService, _super);
    function CandidateDummyService(_http) {
        _super.call(this);
        this._http = _http;
        this.url = 'app/Json/Candidate.json';
        this.candidates = [
            new Candidate_1.Candidate(1, "Akhil", "Akhil@a.com", "123456789", 9, "BD", 89, "BD", "123456", "XYZ", 90),
            new Candidate_1.Candidate(2, "Kumar", "Kumar@a.com", "123456789", 3, "Java", 99, "BD", "123456", "XYZ", 89),
            new Candidate_1.Candidate(3, "Ranjith", "Ranjith@a.com", "123456789", 7, "Dotnet", null, "BD", "123456", "ABC", 88),
            new Candidate_1.Candidate(4, "Suraj", "Suraj@a.com", "123456789", 4, "Dotnet", 87, "BD", "123456", "XYZ", 87),
            new Candidate_1.Candidate(5, "Nagaraj", "Nagaraj@a.com", "123456789", 2, "PLI", null, "BD", "123456", "LMN", 86)
        ];
        console.log('Inside CandidateService');
    }
    CandidateDummyService.prototype.candidateLogin = function (email, pwd) {
        return Rs.Observable.from([false]);
    };
    CandidateDummyService.prototype.getCandidates = function () {
        return this._http.get(this.url)
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log('All : ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    // yet to implement
    CandidateDummyService.prototype.saveCandidate = function (candidate) {
        // var jsonfile = require('jsonfile');
        // jsonfile.writeFile(this.url, candidate, function () {
        //   console.error("err")
        // });
        // return Rs.Observable.from([this.can]);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this._http
            .post(this.url, candidate, options)
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log('All : ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
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
    CandidateDummyService.prototype.getCandidate = function (Id) {
        // this._http.get(this.url, Id)
        // .map((response : Response) => <Candidate> response.json())
        // .do(data => console.log('All : ' + JSON.stringify(data)))
        // .catch(this.handleError).subscribe(cans => this.candidates = cans);
        this.can = this.candidates.find(function (c) { return c.ID === Id; });
        return Rs.Observable.from([this.can]);
    };
    CandidateDummyService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    CandidateDummyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CandidateDummyService);
    return CandidateDummyService;
}(CandidateMethods));
exports.CandidateDummyService = CandidateDummyService;
//# sourceMappingURL=Candidate.service.js.map