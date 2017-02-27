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
var Rs = require('rxjs/Rx');
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
        // console.log('Inside LoginService');
        this.config = this.configSrvc.config;
        // console.log('Configurations: '+ JSON.stringify(this.config));
        this.url = this.config['apiUrl'] + 'login/auth';
    }
    LoginReal.prototype.login = function (Email, Password) {
        var body = "Email=" + Email + "&Password=" + Password;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http
            .post(this.url, body, { headers: headers })
            .map(function (response) {
            //  console.log(response);
            //  console.log(response.json().status);
            //  switch(response.json().status){
            //   case 401 : return false;
            //   case 200 : return true;
            //   default: return false;
            //  }
            // login successful if there's a jwt token in the response
            var token = response.json() && response.json().Token;
            // let tok=response.json().Token;
            if (token) {
                // set token property
                //this.token = token;
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('id_token', JSON.stringify({ token: response.json().Token }));
                //  console.log(JSON.parse(localStorage.getItem('id_token')).token);
                //  console.log(JSON.parse(localStorage.getItem('id_token')).token.length);
                return "t";
            }
        }).catch(function (e) {
            if (e.status === 401) {
                return Observable_1.Observable.throw("f");
            }
        });
        //  } else {
        //localStorage.setItem('emsg',JSON.stringify({ status: response.json().status}));
        // return false to indicate failed login  q6JWJaH0hs
        //     console.log("faiul");
        //  return false;
        // }
        // }).catch(res => this._handleError.handleError(res));
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