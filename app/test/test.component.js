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
var Questions_service_1 = require('../Services/Questions.service');
var common_1 = require('@angular/common');
var TestComponent = (function () {
    function TestComponent(_router, _questionService, location) {
        var _this = this;
        this._questionService = _questionService;
        this.location = location;
        this.router = _router;
        location.onPopState(function () {
            _this.gotoSubmitTest();
        });
        this.index = 0;
    }
    TestComponent.prototype.ngOnInit = function () {
        this.getQuetions();
    };
    TestComponent.prototype.getQuetions = function () {
        var _this = this;
        this._questionService.getQuestions()
            .subscribe(function (questions) { return _this.questions = questions; }, function (error) {
            alert(error);
            localStorage.removeItem('id_token');
            _this.router.navigate(['testlogin']);
        });
        this.show = false;
    };
    TestComponent.prototype.gotoSaveTest = function () {
        this.show = true;
    };
    TestComponent.prototype.gotoSubmitTest = function () {
        var _this = this;
        this._questionService.saveQuestions(this.questions)
            .subscribe(function (can) {
            localStorage.removeItem('id_token');
            _this.router.navigate(['testsuccess']);
        }, function (error) { return _this.errorMessage = error; });
    };
    TestComponent = __decorate([
        core_1.Component({
            selector: 'test',
            templateUrl: './app/test/test.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, Questions_service_1.QuestionsMethods, common_1.PlatformLocation])
    ], TestComponent);
    return TestComponent;
}());
exports.TestComponent = TestComponent;
//# sourceMappingURL=test.component.js.map