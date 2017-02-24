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
var Candidate_service_1 = require('../Services/Candidate.service');
var Skills_service_1 = require('../Services/Skills.service');
var SummaryComponent = (function () {
    function SummaryComponent(_router, _candidateService, _skillService) {
        this._candidateService = _candidateService;
        this._skillService = _skillService;
        this.router = _router;
    }
    SummaryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._skillService.getSkills().subscribe(function (skills) { return _this.skills = skills; }, function (error) { return _this.errorMessage = error; });
        this._candidateService.getCandidates().subscribe(function (candidates) { return _this.candidates = candidates; }, function (error) { return _this.errorMessage = error; });
    };
    SummaryComponent.prototype.logout = function () {
        localStorage.removeItem('id_token');
        localStorage.removeItem('Authlevel');
        this.router.navigate(['login']);
    };
    SummaryComponent = __decorate([
        core_1.Component({
            selector: 'summary',
            templateUrl: './app/internal/summary.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, Candidate_service_1.CandidateMethods, Skills_service_1.SkillMethods])
    ], SummaryComponent);
    return SummaryComponent;
}());
exports.SummaryComponent = SummaryComponent;
//# sourceMappingURL=summary.component.js.map