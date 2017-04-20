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
require("rxjs/add/operator/map");
//import * as Rs from 'rxjs/Rx';
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
var config_service_1 = require("../config/config.service");
var HandleError_service_1 = require("./HandleError.service");
var SkillMethods = (function () {
    function SkillMethods() {
    }
    return SkillMethods;
}());
exports.SkillMethods = SkillMethods;
var SkillService = (function (_super) {
    __extends(SkillService, _super);
    function SkillService(_http, configSrvc, _handleError) {
        var _this = _super.call(this) || this;
        _this._http = _http;
        _this.configSrvc = configSrvc;
        _this._handleError = _handleError;
        //console.log('Inside SkillService');
        _this.config = _this.configSrvc.config;
        //console.log('Configurations: '+ JSON.stringify(this.config));
        _this.url = _this.config['apiUrl'] + 'recruitment/home';
        return _this;
    }
    SkillService.prototype.getSkills = function () {
        var _this = this;
        return this._http.get(this.url)
            .map(function (response) { return response.json(); })
            .catch(function (res) { return _this._handleError.handleError(res); });
    };
    // yet to implement
    SkillService.prototype.saveSkill = function (skill) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this._http
            .post(this.url, skill, options)
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log('All : ' + JSON.stringify(data)); })
            .catch(function (res) { return _this._handleError.handleError(res); });
    };
    return SkillService;
}(SkillMethods));
SkillService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, config_service_1.ConfigService,
        HandleError_service_1.HandleError])
], SkillService);
exports.SkillService = SkillService;
var SkillDummyService = (function (_super) {
    __extends(SkillDummyService, _super);
    function SkillDummyService(_http) {
        var _this = _super.call(this) || this;
        _this._http = _http;
        _this.url = 'app/Json/Skills.json';
        return _this;
    }
    SkillDummyService.prototype.getSkills = function () {
        return this._http.get(this.url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SkillDummyService.prototype.saveSkill = function (skill) {
        this.skills.push(skill);
        return Rs.Observable.from([this.skills]);
    };
    // getSkill(): Promise<Skill[]> {
    //   return this.http.get(this.skills)
    //   .toPromise().then(response => response.json().data as Skill[])
    //              .catch(this.handleError);
    // }
    // saveSkill(skill:Skill)
    // {
    //   this.http.get(this.url)
    //              .toPromise()
    //              .then(response => response.json().data as Skill[])
    //              .catch(this.handleError);
    // }
    SkillDummyService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return SkillDummyService;
}(SkillMethods));
SkillDummyService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], SkillDummyService);
exports.SkillDummyService = SkillDummyService;
//# sourceMappingURL=Skills.service.js.map