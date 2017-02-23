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
var Authentication_1 = require('../Recruitment/Authentication/Authentication');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
var Rs = require('rxjs/Rx');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
var AuthUserMethods = (function () {
    function AuthUserMethods() {
    }
    return AuthUserMethods;
}());
exports.AuthUserMethods = AuthUserMethods;
var AuthUserService = (function (_super) {
    __extends(AuthUserService, _super);
    function AuthUserService(_http) {
        _super.call(this);
        this._http = _http;
        this.url = 'http://localhost:8088/api/logonuser';
        console.log('Inside Authenticate service');
    }
    AuthUserService.prototype.logout = function () {
        localStorage.removeItem("user");
        //this._router.navigate(['Login']);
    };
    AuthUserService.prototype.login = function (user) {
        var body = "username=" + user.Email + "&password=" + user.Password;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http
            .post(this.url, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log('All : ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    AuthUserService.prototype.checkCredentials = function () {
        // if (localStorage.getItem("user") === null){
        //     //this._router.navigate(['Login']);
        // }
    };
    AuthUserService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    AuthUserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthUserService);
    return AuthUserService;
}(AuthUserMethods));
exports.AuthUserService = AuthUserService;
var AuthUserDummyService = (function (_super) {
    __extends(AuthUserDummyService, _super);
    function AuthUserDummyService(_http) {
        _super.call(this);
        this._http = _http;
        this.url = 'http://localhost:8088/api/logon';
        //private can : Candidate;
        this.users = [
            new Authentication_1.Authentication(1, "suraj.nd4444@gmail.com", "1234567", 1),
            new Authentication_1.Authentication(2, "kumar@danske.com", "1234567", 1),
            new Authentication_1.Authentication(3, "Akhil@danske.com", "1234567", 1),
            new Authentication_1.Authentication(4, "Ranjit@danske.com", "1234567", 1)
        ];
        console.log('Inside Authentication service');
    }
    AuthUserDummyService.prototype.logout = function () {
        localStorage.removeItem('user');
        //this._router.navigate(['Login']);
    };
    AuthUserDummyService.prototype.login = function (user) {
        var authenticatedUser = this.users.find(function (u) { return u.Email === user.Email; });
        if (authenticatedUser && authenticatedUser.Password === user.Password) {
            localStorage.setItem('user', JSON.stringify({ Email: authenticatedUser.Email, Password: authenticatedUser.Password }));
            return Rs.Observable.from([true]);
        }
        return Rs.Observable.from([false]);
    };
    //isLogin() : boolean
    //{
    //}
    AuthUserDummyService.prototype.checkCredentials = function () {
        // if (localStorage.getItem('user') === null){  
        if (localStorage.getItem('id_token') === null)
            return false;
        else
            return true;
        // }
    };
    AuthUserDummyService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    AuthUserDummyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthUserDummyService);
    return AuthUserDummyService;
}(AuthUserMethods));
exports.AuthUserDummyService = AuthUserDummyService;
//# sourceMappingURL=AuthenticateUser.service.js.map