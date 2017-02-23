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
require('rxjs/add/operator/map');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
var config_service_1 = require('../config/config.service');
var HandleError_service_1 = require('./HandleError.service');
var SummaryMethods = (function () {
    function SummaryMethods() {
    }
    return SummaryMethods;
}());
exports.SummaryMethods = SummaryMethods;
var QuestionsService = (function (_super) {
    __extends(QuestionsService, _super);
    function QuestionsService(_http, configSrvc, _handleError) {
        _super.call(this);
        this._http = _http;
        this.configSrvc = configSrvc;
        this._handleError = _handleError;
        console.log('Inside SummaryService');
        this.config = this.configSrvc.config;
        console.log('Configurations: ' + JSON.stringify(this.config));
        this.url = this.config['apiUrl'] + '';
    }
    QuestionsService.prototype.getSummary = function () {
        var _this = this;
        return this._http.get(this.url)
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log('All : ' + JSON.stringify(data)); })
            .catch(function (res) { return _this._handleError.handleError(res); });
    };
    QuestionsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, config_service_1.ConfigService, HandleError_service_1.HandleError])
    ], QuestionsService);
    return QuestionsService;
}(SummaryMethods));
exports.QuestionsService = QuestionsService;
var SummayDummyService = (function (_super) {
    __extends(SummayDummyService, _super);
    function SummayDummyService(_http) {
        _super.call(this);
        this._http = _http;
        this.url = 'app/Json/Candidate.json';
    }
    SummayDummyService.prototype.getSummary = function () {
        return this._http.get(this.url)
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log('All : ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    SummayDummyService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    SummayDummyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SummayDummyService);
    return SummayDummyService;
}(SummaryMethods));
exports.SummayDummyService = SummayDummyService;
//# sourceMappingURL=Summary.service.js.map