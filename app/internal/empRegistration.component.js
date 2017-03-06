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
var Employee_service_1 = require('../Services/Employee.service');
var Employee_1 = require('../Recruitment/Employee/Employee');
var Skills_service_1 = require('../Services/Skills.service');
var EmpRegistrationComponent = (function () {
    function EmpRegistrationComponent(_router, _empService, _skillService, route) {
        this._empService = _empService;
        this._skillService = _skillService;
        this.route = route;
        this.router = _router;
    }
    EmpRegistrationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.emp = new Employee_1.Employee('', '', '', '', '');
        this.roles = [
            {
                "ID": 1,
                "Role": "Admin"
            },
            {
                "ID": 2,
                "Role": "Manager"
            },
            {
                "ID": 3,
                "Role": "Architect"
            },
            {
                "ID": 4,
                "Role": "BD"
            },
            {
                "ID": 5,
                "Role": "Developer"
            }
        ];
        this._skillService.getSkills().subscribe(function (skills) { return _this.skills = skills; }, function (error) { return _this.errorMessage = error; });
    };
    EmpRegistrationComponent.prototype.regEmployee = function () {
        var _this = this;
        if (this.emp.Email == '') {
            this.errorMessage = "please enter your Email id";
        }
        else if (this.emp.Name == '') {
            this.errorMessage = "Please enter your Name";
        }
        else if (this.emp.Skill == '0') {
            this.errorMessage = "Please select your skill";
        }
        else if (this.emp.Role == '0') {
            this.errorMessage = "Please select your Role";
        }
        else if (!this.emp.Email.match(new RegExp(/^[A-Z0-9a-z._%+-]+@[A-Za-z0-9-.]+.[A-Za-z]{2,4}$/))) {
            this.errorMessage = "invalid email id eg:xyz@abc.com";
        }
        else {
            this._empService.registerEmployee(this.emp).subscribe(function (can) {
                if (can == "Already Registered") {
                    alert("You are already registered before. Please contact the admin");
                }
                else {
                    _this.router.navigate(['/login']);
                }
            }, function (error) { return _this.errorMessage = error; });
        }
    };
    EmpRegistrationComponent.prototype.logout = function () {
        localStorage.removeItem('id_token');
        localStorage.removeItem('Authlevel');
        this.router.navigate(['login']);
    };
    EmpRegistrationComponent = __decorate([
        core_1.Component({
            selector: 'empregistration',
            templateUrl: './app/internal/empRegistration.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, Employee_service_1.EmployeeMethods, Skills_service_1.SkillMethods, router_1.ActivatedRoute])
    ], EmpRegistrationComponent);
    return EmpRegistrationComponent;
}());
exports.EmpRegistrationComponent = EmpRegistrationComponent;
//# sourceMappingURL=empRegistration.component.js.map