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
var Candidate_1 = require('../Recruitment/Candidate/Candidate');
var Skills_service_1 = require('../Services/Skills.service');
var Consultancy_service_1 = require('../Services/Consultancy.service');
var RegistrationComponent = (function () {
    //public r:any;
    function RegistrationComponent(_skillService, _candidateService, _consultancyService, router) {
        this._skillService = _skillService;
        this._candidateService = _candidateService;
        this._consultancyService = _consultancyService;
        this.router = router;
        this.today = Date.now();
    }
    RegistrationComponent.prototype.onChange = function (event) {
        var eventObj = event;
        var target = eventObj.target;
        var files = target.files;
        this.file = files[0];
        //console.log(this.file); 
    };
    RegistrationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._skillService.getSkills().subscribe(function (skills) { return _this.skills = skills; }, function (error) { return _this.errorMessage = error; });
        this._consultancyService.getConsultancy().subscribe(function (cons) { return _this.Consul = cons; }, function (error) { return _this.errorMessage = error; });
        this.candidate = new Candidate_1.Candidate(null, '', '', '', null, '0', this.today, '0', null, '', '', null);
    };
    RegistrationComponent.prototype.gotoSuccessPage = function () {
        var _this = this;
        if (this.candidate.Email == '') {
            this.errorMessage = "please enter your Email id";
        }
        else if (this.candidate.Name == '') {
            this.errorMessage = "Please enter your Name";
        }
        else if (this.candidate.Phone == '') {
            this.errorMessage = "Please enter your Phone number";
        }
        else if (!this.candidate.Experience) {
            this.errorMessage = "Please enter year of experiance in numbers";
        }
        else if (this.candidate.Skill == '0') {
            this.errorMessage = "Please select your skill";
        }
        else if (this.candidate.Consultancy == '0') {
            this.errorMessage = "Please select your Consultancy";
        }
        else if (!this.file) {
            this.errorMessage = "Please upload your resume";
        }
        else if (!this.candidate.Email.match(new RegExp(/^[A-Z0-9a-z._%+-]+@[A-Za-z0-9-.]+.[A-Za-z]{2,4}$/))) {
            this.errorMessage = "invalid email id eg:xyz@abc.com";
        }
        else if (!this.candidate.Phone.match(new RegExp(/^[0-9]{10}$/))) {
            this.errorMessage = "invalid Phone number";
        }
        else if (!(String(this.candidate.Experience).match(new RegExp(/^[0-9]{0,2}(\.[0-9]{0,1}?)?$/)))) {
            this.errorMessage = "Invalid years of expreiance entered Eg:3.7";
        }
        else {
            //console.log(JSON.stringify(this.candidate));
            this._candidateService.saveCandidate(this.candidate)
                .subscribe(function (can) {
                if (can == "Already Registered") {
                    alert("Yo are already registered before !!! contact admin ..");
                }
                else {
                    _this.router.navigate(['/registrationsuccess']);
                    _this._candidateService.UploadResume(_this.file, _this.candidate.Email)
                        .subscribe(function (can) { _this.message = can; }, function (err) {
                        _this.errorMessage = err;
                    });
                }
            }, function (error) { return _this.errorMessage = error; });
        }
    };
    RegistrationComponent = __decorate([
        core_1.Component({
            selector: 'registration',
            templateUrl: './app/welcome/registration.html'
        }), 
        __metadata('design:paramtypes', [Skills_service_1.SkillMethods, Candidate_service_1.CandidateMethods, Consultancy_service_1.ConsultancyService, router_1.Router])
    ], RegistrationComponent);
    return RegistrationComponent;
}());
exports.RegistrationComponent = RegistrationComponent;
//# sourceMappingURL=registration.component.js.map