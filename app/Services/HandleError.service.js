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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
//import * as Rs from 'rxjs/Rx';
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
var config_service_1 = require("../config/config.service");
var HandleError = (function () {
    function HandleError() {
    }
    return HandleError;
}());
exports.HandleError = HandleError;
var HandleErrorService = (function (_super) {
    __extends(HandleErrorService, _super);
    function HandleErrorService(_http, configSrvc) {
        var _this = _super.call(this) || this;
        _this._http = _http;
        _this.configSrvc = configSrvc;
        //console.log('Inside HandleService');
        _this.config = _this.configSrvc.config;
        _this.url = _this.config['apiUrl'] + 'recruitment/log';
        return _this;
    }
    HandleErrorService.prototype.handleError = function (error) {
        // console.error('An error occurred', error);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        this._http
            .post(this.url, error, options);
        // .do(data => console.log('All : ' + JSON.stringify(data)));         
        return Observable_1.Observable.throw(error.json().error || 'Server error..');
    };
    return HandleErrorService;
}(HandleError));
HandleErrorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, config_service_1.ConfigService])
], HandleErrorService);
exports.HandleErrorService = HandleErrorService;
//# sourceMappingURL=HandleError.service.js.map