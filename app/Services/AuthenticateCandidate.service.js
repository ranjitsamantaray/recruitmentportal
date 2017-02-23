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
var AuthCandidateMethods = (function () {
    function AuthCandidateMethods() {
    }
    return AuthCandidateMethods;
}());
exports.AuthCandidateMethods = AuthCandidateMethods;
var AuthCandidateService = (function (_super) {
    __extends(AuthCandidateService, _super);
    function AuthCandidateService(_http) {
        _super.call(this);
        this._http = _http;
        this.url = 'http://localhost:8088/api/logon';
        console.log('Inside CandidateService');
    }
    AuthCandidateService.prototype.logout = function () {
        //localStorage.removeItem("can");
        //this._router.navigate(['Login']);
    };
    AuthCandidateService.prototype.login = function (can) {
        var body = "username=" + can.Email + "&password=" + can.Password;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http
            .post(this.url, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log('All : ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    AuthCandidateService.prototype.checkCredentials = function () {
        // if (localStorage.getItem("user") === null){
        //     //this._router.navigate(['Login']);
        // }
    };
    AuthCandidateService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    AuthCandidateService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthCandidateService);
    return AuthCandidateService;
}(AuthCandidateMethods));
exports.AuthCandidateService = AuthCandidateService;
var AuthCandidateDummyService = (function (_super) {
    __extends(AuthCandidateDummyService, _super);
    function AuthCandidateDummyService(_http) {
        _super.call(this);
        this._http = _http;
        this.url = 'http://localhost:8088/api/logon';
        //private can : Candidate;
        this.candidates = [
            new Candidate_1.Candidate(1, "Suraj", "suraj.nd4444@gmail.com", "1234567", 5, "", null, "", "123456"),
            new Candidate_1.Candidate(1, "Kumar", "kumar@danske.com", "1234567", 5, "", null, "", "123456"),
            new Candidate_1.Candidate(1, "Akhil", "Akhil@danske.com", "1234567", 5, "", null, "", "123456"),
            new Candidate_1.Candidate(1, "Ranjit", "Ranjit@danske.com", "1234567", 5, "", null, "", "123456")
        ];
        console.log('Inside CandidateService');
    }
    AuthCandidateDummyService.prototype.logout = function () {
        localStorage.removeItem('can');
        //this._router.navigate(['Login']);
    };
    AuthCandidateDummyService.prototype.login = function (can) {
        var authenticatedUser = this.candidates.find(function (u) { return u.Email === can.Email; });
        if (authenticatedUser && authenticatedUser.Password === can.Password) {
            localStorage.setItem('can', JSON.stringify({ Email: authenticatedUser.Email, Password: authenticatedUser.Password }));
            return Rs.Observable.from([true]);
        }
        return Rs.Observable.from([false]);
    };
    AuthCandidateDummyService.prototype.checkCredentials = function () {
        if (localStorage.getItem('can') === null) {
        }
    };
    AuthCandidateDummyService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    AuthCandidateDummyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthCandidateDummyService);
    return AuthCandidateDummyService;
}(AuthCandidateMethods));
exports.AuthCandidateDummyService = AuthCandidateDummyService;
//# sourceMappingURL=AuthenticateCandidate.service.js.map