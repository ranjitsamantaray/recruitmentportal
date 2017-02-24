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
var http_1 = require("@angular/http");
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/do');
var ConfigService = (function () {
    function ConfigService(http) {
        this.http = http;
        console.log('ctor for ConfigService called.');
        this.obj =
            {
                "apiUrl": "http://recruitmentservices.azurewebsites.net/",
                "mode": "Development"
            };
        this.output = this.obj;
    }
    ConfigService.prototype.load = function () {
        var _this = this;
        console.log('Inside Load');
        // var p1 = new Promise((resolve) => { 
        //   this.http.get('app/config/appConfig.json').map(res => res.json())
        //     .subscribe(config => {
        //       console.log('Configuration loaded...........');
        //       this.config = config;
        //       resolve();
        //     });
        // });
        console.log(this.output);
        return new Promise(function (resolve) {
            _this.config = _this.output;
            resolve();
        });
        // console.log(p1);
        // return p1;
    };
    ConfigService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ConfigService);
    return ConfigService;
}());
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map