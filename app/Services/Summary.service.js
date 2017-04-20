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
var Candidate_1 = require("../Recruitment/Candidate/Candidate");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
var config_service_1 = require("../config/config.service");
var HandleError_service_1 = require("./HandleError.service");
var SummaryMethods = (function () {
    function SummaryMethods() {
    }
    return SummaryMethods;
}());
exports.SummaryMethods = SummaryMethods;
var SummaryService = (function (_super) {
    __extends(SummaryService, _super);
    function SummaryService(_http, configSrvc, _handleError) {
        var _this = _super.call(this) || this;
        _this._http = _http;
        _this.configSrvc = configSrvc;
        _this._handleError = _handleError;
        _this.config = _this.configSrvc.config;
        _this.url = _this.config['apiUrl'] + 'dbsecure-can/summary';
        return _this;
    }
    SummaryService.prototype.getSummary = function () {
        var token = localStorage.getItem('id_token');
        var headers = new http_1.Headers();
        headers.append('acc-token', "" + token);
        return this._http.get(this.url, { headers: headers })
            .map(function (r) {
            var x = r.json();
            var candidates = new Array();
            for (var i = 0; i < x.length; i++) {
                var s = new Candidate_1.Candidate(x[i].ID, x[i].Email, x[i].Name, "", x[i].Experience, x[i].Skill, x[i].Registration_Date, x[i].Consultant_Name, x[i].Score, x[i].Status, "", x[i].Logic_Score);
                candidates.push(s);
            }
            return candidates;
        })
            .catch(function (err) {
            return Observable_1.Observable.throw(err.statusText);
        });
    };
    return SummaryService;
}(SummaryMethods));
SummaryService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, config_service_1.ConfigService,
        HandleError_service_1.HandleError])
], SummaryService);
exports.SummaryService = SummaryService;
var SummayDummyService = (function (_super) {
    __extends(SummayDummyService, _super);
    function SummayDummyService(_http) {
        var _this = _super.call(this) || this;
        _this._http = _http;
        _this.url = 'app/Json/Candidate.json';
        return _this;
    }
    SummayDummyService.prototype.getSummary = function () {
        var token = localStorage.getItem('id_token');
        console.log('token:' + token);
        var headers = new http_1.Headers();
        headers.append('acc-token', "" + token);
        return this._http.get(this.url, { headers: headers })
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log('All : ' + JSON.stringify(data)); })
            .catch(function (err) {
            console.log('Error returned from summary Service: ' + err);
            return Observable_1.Observable.throw(err.statusText);
        });
    };
    SummayDummyService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return SummayDummyService;
}(SummaryMethods));
SummayDummyService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], SummayDummyService);
exports.SummayDummyService = SummayDummyService;
//# sourceMappingURL=Summary.service.js.map