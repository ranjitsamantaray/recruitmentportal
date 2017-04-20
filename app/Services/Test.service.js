"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var Eval_1 = require("../Recruitment/Eval");
var Test_1 = require("../Recruitment/Test/Test");
var Candidate_1 = require("../Recruitment/Candidate/Candidate");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
//import * as Rs from 'rxjs/Rx';
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
var config_service_1 = require("../config/config.service");
var HandleError_service_1 = require("./HandleError.service");
var TestMethods = (function () {
    function TestMethods() {
    }
    return TestMethods;
}());
exports.TestMethods = TestMethods;
var TestService = (function (_super) {
    __extends(TestService, _super);
    function TestService(_http, configSrvc, _handleError) {
        var _this = _super.call(this) || this;
        _this._http = _http;
        _this.configSrvc = configSrvc;
        _this._handleError = _handleError;
        console.log('Inside TestService');
        _this.config = _this.configSrvc.config;
        console.log('Configurations: ' + JSON.stringify(_this.config));
        _this.url = _this.config['apiUrl'] + 'dbsecure-can/answers';
        _this.urlSave = _this.config['apiUrl'] + 'dbsecure-can/submiteval';
        return _this;
    }
    TestService.prototype.saveTest = function (subTest) {
        console.log(JSON.stringify(subTest));
        var token = localStorage.getItem('id_token');
        var headers = new http_1.Headers();
        headers.append('acc-token', "" + token);
        headers.append('Content-Type', 'application/json');
        return this._http.post(this.urlSave, subTest, { headers: headers })
            .map(function (response) { return response; })
            .catch(function (err) {
            console.log('Error returned from test Service: ' + err);
            return Observable_1.Observable.throw(err.statusText);
        });
    };
    TestService.prototype.getTest = function (canId) {
        var token = localStorage.getItem('id_token');
        var params = new http_1.URLSearchParams();
        params.set("Email", canId);
        var headers = new http_1.Headers();
        headers.append('acc-token', "" + token);
        var options = new http_1.RequestOptions({ headers: headers });
        options.search = params;
        return this._http.get(this.url, options)
            .map(function (r) {
            var x = r.json();
            var e = new Eval_1.Eval();
            var questions = new Array();
            var cand = new Candidate_1.Candidate(x.recordset.ID, "", x.recordset.Name, "", x.recordset.Experience, x.recordset.Skill, null, x.recordset.Consultant_Name, x.recordset.Score, x.recordset.Status, "", x.recordset.Logic_Score);
            for (var i = 0; i < x.rec.length; i++) {
                var s = new Test_1.Test(x.rec[i].Question_ID, x.rec[i].Question, x.rec[i].Answer, "");
                questions.push(s);
            }
            e.rec = questions;
            e.recordset = cand;
            return e;
        })
            .catch(function (err) {
            console.log('Error returned from evaluation Service: ' + err);
            return Observable_1.Observable.throw(err.statusText);
        });
    };
    return TestService;
}(TestMethods));
TestService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, config_service_1.ConfigService,
        HandleError_service_1.HandleError])
], TestService);
exports.TestService = TestService;
var TestDummyService = (function (_super) {
    __extends(TestDummyService, _super);
    function TestDummyService(_http) {
        var _this = _super.call(this) || this;
        _this._http = _http;
        _this.url = 'app/Json/Test.json';
        console.log('Inside CandidateService');
        return _this;
    }
    TestDummyService.prototype.saveTest = function (candidateID) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this._http
            .post(this.url, candidateID, options)
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log('All : ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    TestDummyService.prototype.getTest = function (canId) {
        var token = localStorage.getItem('id_token');
        console.log('token:' + token);
        var params = new http_1.URLSearchParams();
        params.set("Email", canId);
        var headers = new http_1.Headers();
        headers.append('acc-token', "" + token);
        var options = new http_1.RequestOptions({ headers: headers });
        options.search = params;
        // let token = localStorage.getItem('id_token');
        // console.log('token:' + token);
        // let headers = new Headers();
        // headers.append('acc-token',`${token}`);    
        // var body=`Email=${canId}`;    
        // headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url, options)
            .map(function (r) {
            var x = r.json();
            var questions = new Array();
            for (var i = 0; i < x.length; i++) {
                var s = new Test_1.Test(x[i].Question_ID, x[i].Question, x[i].Answer, "");
                questions.push(s);
            }
            return questions;
        })
            .do(function (data) { return console.log('All : ' + JSON.stringify(data)); })
            .catch(function (err) {
            console.log('Error returned from evaluation Service: ' + err);
            return Observable_1.Observable.throw(err.statusText);
        });
    };
    TestDummyService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    return TestDummyService;
}(TestMethods));
TestDummyService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TestDummyService);
exports.TestDummyService = TestDummyService;
//# sourceMappingURL=Test.service.js.map