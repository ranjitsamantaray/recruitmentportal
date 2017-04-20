"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var registration_component_1 = require("./welcome/registration.component");
var static_component_1 = require("./welcome/static.component");
var success_component_1 = require("./welcome/success.component");
var welcome_component_1 = require("./welcome/welcome.component");
var login_component_1 = require("./internal/login.component");
var testlogin_component_1 = require("./test/testlogin.component");
var test_component_1 = require("./test/test.component");
var summary_component_1 = require("./internal/summary.component");
var testsuccess_component_1 = require("./test/testsuccess.component");
var evaluation_component_1 = require("./internal/evaluation.component");
var Skills_service_1 = require("./Services/Skills.service");
var Candidate_service_1 = require("./Services/Candidate.service");
var AuthenticateCandidate_service_1 = require("./Services/AuthenticateCandidate.service");
var Timer_component_1 = require("./Shared/Timer.component");
var Questions_service_1 = require("./Services/Questions.service");
var AuthenticateUser_service_1 = require("./Services/AuthenticateUser.service");
var Test_service_1 = require("./Services/Test.service");
var Consultancy_service_1 = require("./Services/Consultancy.service");
var Login_service_1 = require("./Services/Login.service");
var angular2_jwt_1 = require("angular2-jwt");
var auth_guard_1 = require("./auth.guard");
var config_service_1 = require("./config/config.service");
var HandleError_service_1 = require("./Services/HandleError.service");
var common_1 = require("@angular/common");
var empRegistration_component_1 = require("./internal/empRegistration.component");
var Employee_service_1 = require("./Services/Employee.service");
var Summary_service_1 = require("./Services/Summary.service");
var newline_pipe_1 = require("./Shared/newline.pipe");
var Filter_component_1 = require("./Shared/Filter.component");
var Sort_pipe_1 = require("./Shared/Sort.pipe");
var ng2_pagination_1 = require("ng2-pagination");
var mydatepicker_1 = require("mydatepicker");
var primeng_1 = require("primeng/primeng");
//import { Ng2SmartTableModule } from 'ng2-smart-table';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, app_routing_1.routing, http_1.HttpModule, mydatepicker_1.MyDatePickerModule, forms_1.FormsModule, ng2_pagination_1.Ng2PaginationModule, primeng_1.LightboxModule],
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
            evaluation_component_1.EvaluationComponent,
            Timer_component_1.TimerComponent,
            empRegistration_component_1.EmpRegistrationComponent,
            newline_pipe_1.NewlinePipe,
            Filter_component_1.FilterComponent,
            Sort_pipe_1.SortComponent
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [{ provide: Skills_service_1.SkillMethods, useClass: Skills_service_1.SkillService },
            { provide: Candidate_service_1.CandidateMethods, useClass: Candidate_service_1.CandidateService },
            { provide: AuthenticateCandidate_service_1.AuthCandidateMethods, useClass: AuthenticateCandidate_service_1.AuthCandidateDummyService },
            { provide: Questions_service_1.QuestionsMethods, useClass: Questions_service_1.QuestionsService },
            { provide: AuthenticateUser_service_1.AuthUserMethods, useClass: AuthenticateUser_service_1.AuthUserDummyService },
            { provide: Test_service_1.TestMethods, useClass: Test_service_1.TestService },
            { provide: Login_service_1.Login, useClass: Login_service_1.LoginReal }, Consultancy_service_1.ConsultancyService,
            { provide: HandleError_service_1.HandleError, useClass: HandleError_service_1.HandleErrorService },
            { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
            { provide: Summary_service_1.SummaryMethods, useClass: Summary_service_1.SummaryService },
            { provide: Employee_service_1.EmployeeMethods, useClass: Employee_service_1.EmployeeService },
            auth_guard_1.AuthGuard].concat(angular2_jwt_1.AUTH_PROVIDERS, [config_service_1.ConfigService,
            { provide: core_1.APP_INITIALIZER,
                useFactory: function (config) { return function () { return config.load(); }; },
                deps: [config_service_1.ConfigService],
                multi: true }])
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map