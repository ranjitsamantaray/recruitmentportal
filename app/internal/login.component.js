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
var router_1 = require('@angular/router');
var Login_service_1 = require('../Services/Login.service');
var LoginComponent = (function () {
    function LoginComponent(_authService, _router) {
        this._authService = _authService;
        this.email = '';
        this.pwd = '';
        this.router = _router;
    }
    LoginComponent.prototype.ngOnInit = function () {
        // this.can = new Candidate(null,'','','',null,'',null,'',null,'',null);
    };
    LoginComponent.prototype.gotoSuccessPage = function () {
        var _this = this;
        if (this.email == '') {
            this.errorMessage = "please enter your Email id";
        }
        else if (this.pwd == '') {
            this.errorMessage = "Please enter your password";
        }
        else {
            this._authService.login(this.email, this.pwd)
                .subscribe(function (result) {
                if (result === 't')
                    _this.router.navigate(['/summary']);
            }, function (err) {
                _this.errorMessage = err;
            });
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: './app/internal/login.html'
        }), 
        __metadata('design:paramtypes', [Login_service_1.Login, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map