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
var Summary_service_1 = require('../Services/Summary.service');
var Skills_service_1 = require('../Services/Skills.service');
var Consultancy_service_1 = require('../Services/Consultancy.service');
var SummaryComponent = (function () {
    function SummaryComponent(_router, _summaryService, _consultancyService, _skillService) {
        this._summaryService = _summaryService;
        this._consultancyService = _consultancyService;
        this._skillService = _skillService;
        this.date1 = null;
        this.Name = null;
        this.myDatePickerOptions = {
            // other options...
            dateFormat: 'dd-mm-yyyy',
            height: "24px",
            width: "95%",
            selectionTxtFontSize: "13px",
        };
        this.router = _router;
    }
    SummaryComponent.prototype.onDateChanged = function (event) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
        if (event.formatted) {
            this.date1 = String(event.formatted);
            var date = this.date1.split('-');
            this.date1 = date[2] + "-" + date[1] + "-" + date[0];
        }
        else
            this.date1 = null;
    };
    SummaryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._skillService.getSkills().subscribe(function (skills) { return _this.skills = skills; }, function (error) { return _this.errorMessage = error; });
        this._consultancyService.getConsultancy().subscribe(function (cons) { return _this.Consul = cons; }, function (error) { return _this.errorMessage = error; });
        this._summaryService.getSummary().subscribe(function (candidates) {
            _this.candidates = candidates;
            for (var i = 0; i < _this.candidates.length; i++) {
                _this.candidates[i].Consultancy = String(_this.Consul[Number(_this.candidates[i].Consultancy) - 1].Name);
                if (_this.candidates[i].Score)
                    _this.candidates[i].Score = _this.candidates[i].Score / 10;
            }
        }, function (error) {
            alert(error);
            localStorage.removeItem('id_token');
            _this.router.navigate(['login']);
        });
    };
    SummaryComponent.prototype.logout = function () {
        localStorage.removeItem('id_token');
        this.router.navigate(['login']);
    };
    SummaryComponent = __decorate([
        core_1.Component({
            selector: 'summary',
            templateUrl: './app/internal/summary.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, Summary_service_1.SummaryMethods, Consultancy_service_1.ConsultancyService, Skills_service_1.SkillMethods])
    ], SummaryComponent);
    return SummaryComponent;
}());
exports.SummaryComponent = SummaryComponent;
//# sourceMappingURL=summary.component.js.map