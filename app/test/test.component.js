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
var TestComponent = (function () {
    function TestComponent(_router, _questionService) {
        this._questionService = _questionService;
        this.router = _router;
        //this.questions = new <Question>(null,'','','');
    }
    TestComponent.prototype.ngOnInit = function () {
        this.getQuetions();
        //this.questions[this.questions.length] = new Question('','','');
    };
    TestComponent.prototype.getQuetions = function () {
        var _this = this;
        this._questionService.getQuestions()
            .subscribe(function (questions) { return _this.questions = questions; }, 
        //this.length= (questions[questions.length].Answers).length,
        function (error) { return _this.errorMessage = error; });
        this.show = false;
    };
    TestComponent.prototype.gotoSaveTest = function () {
        this.show = true;
    };
    TestComponent.prototype.gotoReviewTest = function () {
        //this.router.navigate(['review']);
    };
    TestComponent.prototype.gotoSubmitTest = function () {
        var _this = this;
        //debugger;
        this._questionService.saveQuestions(this.questions)
            .subscribe(function (can) {
            //if (can == "") {
            //this.message=(can.Status);
            _this.router.navigate(['testsuccess']);
        }, function (error) { return _this.errorMessage = error; });
        //if(confirm("Submit will close the test are sure you want to continue?")){
        //localStorage.removeItem('id_token');
        // localStorage.removeItem('Authlevel');
        //this.router.navigate(['testsuccess']);
    };
    TestComponent = __decorate([
        core_1.Component({
            selector: 'test',
            templateUrl: './app/test/test.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, Questions_service_1.QuestionsMethods])
    ], TestComponent);
    return TestComponent;
}());
exports.TestComponent = TestComponent;
//# sourceMappingURL=test.component.js.map