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
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var app_routing_1 = require('./app.routing');
var app_component_1 = require('./app.component');
var registration_component_1 = require('./welcome/registration.component');
var static_component_1 = require('./welcome/static.component');
var success_component_1 = require('./welcome/success.component');
var welcome_component_1 = require('./welcome/welcome.component');
var login_component_1 = require('./internal/login.component');
var testlogin_component_1 = require('./test/testlogin.component');
var test_component_1 = require('./test/test.component');
var summary_component_1 = require('./internal/summary.component');
var testsuccess_component_1 = require('./test/testsuccess.component');
var evaluation_component_1 = require('./internal/evaluation.component');
var skill_services_1 = require('./services/skill.services');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, app_routing_1.routing, http_1.HttpModule, forms_1.FormsModule],
            declarations: [app_component_1.AppComponent,
                registration_component_1.RegistrationComponent,
                static_component_1.WelcomeStaticComponent,
                success_component_1.RegistrationSuccessComponent,
                welcome_component_1.WelcomeComponent,
                login_component_1.LoginComponent,
                testlogin_component_1.TestLoginComponent,
                test_component_1.TestComponent,
                testsuccess_component_1.TestSuccessComponent,
                summary_component_1.SummaryComponent,
                evaluation_component_1.EvaluationComponent
            ],
            providers: [skill_services_1.SkillService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map