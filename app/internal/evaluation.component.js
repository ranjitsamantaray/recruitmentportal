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
var Eval_1 = require('../Recruitment/Eval');
var Candidate_service_1 = require('../Services/Candidate.service');
var SubmitTest_1 = require('../Recruitment/SubmitTest');
var EvaluationComponent = (function () {
    function EvaluationComponent(_router, _candidateService, _testService, route) {
        this._candidateService = _candidateService;
        this._testService = _testService;
        this.route = route;
        this.Score = null;
        this.sub = new SubmitTest_1.SubmitTest();
        this.router = _router;
        this.tests = new Eval_1.Eval();
    }
    EvaluationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.email = "yb@danskeit.co.in";
        this.route.params
            .switchMap(function (params) { return _this._testService.getTest(_this.email); })
            .subscribe(function (tests) { return _this.tests = tests; }, function (error) { return _this.errorMessage = error; });
        console.log(this.tests);
    };
    EvaluationComponent.prototype.gotoSaveEval = function () {
        this.show = true;
    };
    EvaluationComponent.prototype.gotoSubmitEval = function () {
        var _this = this;
        this.sub.Candidate_ID = this.tests.recordset.ID;
        this.sub.Evaluation = this.tests.rec;
        this.sub.Score = this.Score;
        this._testService.saveTest(this.sub)
            .subscribe(function (can) {
            _this.router.navigate(['summary']);
        }, function (error) { return _this.errorMessage = error; });
    };
    EvaluationComponent.prototype.score = function (v, testID) {
        console.log(v);
        console.log(this.Score);
        if (this.tests.rec[testID].Status == '') {
            if (v == 'C') {
                this.tests.rec[testID].Status = 'C';
                this.Score = this.Score + 10;
            }
            if (v == 'P') {
                this.tests.rec[testID].Status = 'P';
                this.Score = this.Score + 5;
            }
        }
        else if (this.tests.rec[testID].Status == 'P') {
            if (v == 'C') {
                this.tests.rec[testID].Status = 'C';
                this.Score = this.Score + 5;
            }
            if (v == 'W') {
                this.tests.rec[testID].Status = 'W';
                this.Score = this.Score - 5;
            }
        }
        else if (this.tests.rec[testID].Status == 'C') {
            if (v == 'P') {
                this.tests.rec[testID].Status = 'P';
                this.Score = this.Score - 5;
            }
            if (v == 'W') {
                this.tests.rec[testID].Status = 'W';
                this.Score = this.Score - 10;
            }
        }
        else if (this.tests.rec[testID].Status == 'W') {
            if (v == 'P') {
                this.tests.rec[testID].Status = 'P';
                this.Score = this.Score + 5;
            }
            if (v == 'C') {
                this.tests.rec[testID].Status = 'C';
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