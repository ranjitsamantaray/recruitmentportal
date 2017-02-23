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
var Test_service_1 = require('../Services/Test.service');
var Candidate_service_1 = require('../Services/Candidate.service');
var EvaluationComponent = (function () {
    function EvaluationComponent(_router, _candidateService, _testService, route) {
        this._candidateService = _candidateService;
        this._testService = _testService;
        this.route = route;
        this.Score = null;
        this.router = _router;
        //this.v=route.params.switchMap((params: Params));
    }
    EvaluationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this._testService.getTest(+params['id']); }).subscribe(function (tests) { return _this.tests = tests; }, function (error) { return _this.errorMessage = error; });
        this.route.params
            .switchMap(function (params) { return _this._candidateService.getCandidate(+params['id']); })
            .subscribe(function (candidate) { return _this.candidate = candidate; }, function (error) { return _this.errorMessage = error; });
        this.show = false;
    };
    EvaluationComponent.prototype.gotoSaveEval = function () {
        this.show = true;
    };
    EvaluationComponent.prototype.score = function (v, testID) {
        console.log(v);
        console.log(this.Score);
        if (this.tests[testID].Status == '') {
            if (v == 'C') {
                this.tests[testID].Status = 'C';
                this.Score = this.Score + 10;
            }
            if (v == 'P') {
                this.tests[testID].Status = 'P';
                this.Score = this.Score + 5;
            }
        }
        else if (this.tests[testID].Status == 'P') {
            if (v == 'C') {
                this.tests[testID].Status = 'C';
                this.Score = this.Score + 5;
            }
            if (v == 'W') {
                this.tests[testID].Status = 'W';
                this.Score = this.Score - 5;
            }
        }
        else if (this.tests[testID].Status == 'C') {
            if (v == 'P') {
                this.tests[testID].Status = 'P';
                this.Score = this.Score - 5;
            }
            if (v == 'W') {
                this.tests[testID].Status = 'W';
                this.Score = this.Score - 10;
            }
        }
        else if (this.tests[testID].Status == 'W') {
            if (v == 'P') {
                this.tests[testID].Status = 'P';
                this.Score = this.Score + 5;
            }
            if (v == 'C') {
                this.tests[testID].Status = 'C';
                this.Score = this.Score + 10;
            }
        }
    };
    EvaluationComponent.prototype.logout = function () {
        localStorage.removeItem('id_token');
        localStorage.removeItem('Authlevel');
        this.router.navigate(['login']);
    };
    EvaluationComponent = __decorate([
        core_1.Component({
            selector: 'evaluation',
            templateUrl: './app/internal/evaluation.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, Candidate_service_1.CandidateMethods, Test_service_1.TestMethods, router_1.ActivatedRoute])
    ], EvaluationComponent);
    return EvaluationComponent;
}());
exports.EvaluationComponent = EvaluationComponent;
//# sourceMappingURL=evaluation.component.js.map