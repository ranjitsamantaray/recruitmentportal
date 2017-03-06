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
require('rxjs/add/operator/map');
//import * as Rs from 'rxjs/Rx';
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var Observable_1 = require('rxjs/Observable');
var config_service_1 = require('../config/config.service');
var HandleError_service_1 = require('./HandleError.service');
var Login = (function () {
    function Login() {
    }
    return Login;
}());
exports.Login = Login;
var LoginReal = (function (_super) {
    __extends(LoginReal, _super);
    function LoginReal(_http, configSrvc, _handleError) {
        _super.call(this);
        this._http = _http;
        this.configSrvc = configSrvc;
        this._handleError = _handleError;
        this.config = this.configSrvc.config;
        this.url = this.config['apiUrl'] + 'login/auth';
    }
    LoginReal.prototype.login = function (Email, Password) {
        var body = "Email=" + Email + "&Password=" + Password;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http
            .post(this.url, body, { headers: headers })
            .map(function (response) {
            var token = response.json() && response.json().Token;
            if (token) {
                localStorage.setItem('id_token', response.json().Token);
                return "t";
            }
        }).catch(function (e) {
            var r = JSON.parse(e._body);
            return Observable_1.Observable.throw(r.status);
        });
    };
    LoginReal = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, config_service_1.ConfigService, HandleError_service_1.HandleError])
    ], LoginReal);
    return LoginReal;
}(Login));
exports.LoginReal = LoginReal;
var LoginDummy = (function (_super) {
    __extends(LoginDummy, _super);
    function LoginDummy(_http) {
        _super.call(this);
        this._http = _http;
        this.url = 'http://localhost:8088/api/login';
        console.log('Inside CandidateService');
    }
    LoginDummy.prototype.login = function (email, pwd) {
        // let token:any;
        return Rs.Observable.from(["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ"]);
        //localStorage.setItem('currentUser',token);
        //return token;
    };
    LoginDummy.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    LoginDummy = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LoginDummy);
    return LoginDummy;
}(Login));
exports.LoginDummy = LoginDummy;
//# sourceMappingURL=Login.service.js.map