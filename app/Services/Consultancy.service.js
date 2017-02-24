"use strict";
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
var Consultancy_1 = require('../Recruitment/Consultancy/Consultancy');
var http_1 = require('@angular/http');
var HandleError_service_1 = require('./HandleError.service');
var config_service_1 = require('../config/config.service');
var Rs = require('rxjs/Rx');
var ConsultancyService = (function () {
    //private url2="http"
    function ConsultancyService(_http, _handleError, configSrvc) {
        // console.log('Inside ConsultancyService');
        this._http = _http;
        this._handleError = _handleError;
        this.configSrvc = configSrvc;
    }
    ConsultancyService.prototype.getConsultancy = function () {
        this.con = new Array();
        this.con.push(new Consultancy_1.Consultancy(1, "Direct"));
        this.con.push(new Consultancy_1.Consultancy(2, "ABC"));
        this.con.push(new Consultancy_1.Consultancy(3, "A2HR"));
        this.con.push(new Consultancy_1.Consultancy(4, "Arista"));
        this.con.push(new Consultancy_1.Consultancy(5, "Armour"));
        return Rs.Observable.from([this.con]);
        // return this._http.get(this.url)
        // .map((response : Response) => <Consultancy[]> response.json())
        // //.do(data => console.log('All : ' + JSON.stringify(data)))
        // .catch(res => this._handleError.handleError(res));
    };
    ConsultancyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, HandleError_service_1.HandleError, config_service_1.ConfigService])
    ], ConsultancyService);
    return ConsultancyService;
}());
exports.ConsultancyService = ConsultancyService;
//# sourceMappingURL=Consultancy.service.js.map