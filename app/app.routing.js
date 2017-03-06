"use strict";
var router_1 = require('@angular/router');
var welcome_component_1 = require('./welcome/welcome.component');
var success_component_1 = require('./welcome/success.component');
var login_component_1 = require('./internal/login.component');
var testlogin_component_1 = require('./test/testlogin.component');
var test_component_1 = require('./test/test.component');
var summary_component_1 = require('./internal/summary.component');
var testsuccess_component_1 = require('./test/testsuccess.component');
var evaluation_component_1 = require('./internal/evaluation.component');
//import {EmpRegistrationComponent} from  './internal/empRegistration.component'
var auth_guard_1 = require('./auth.guard');
var appRoutes = [
    { path: 'home', component: welcome_component_1.WelcomeComponent },
    { path: 'registrationsuccess', component: success_component_1.RegistrationSuccessComponent },
    //{ path: 'empregistration', component: EmpRegistrationComponent},
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'testlogin', component: testlogin_component_1.TestLoginComponent },
    { path: 'test', component: test_component_1.TestComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'summary', component: summary_component_1.SummaryComponent },
    { path: 'testsuccess', component: testsuccess_component_1.TestSuccessComponent },
    { path: 'evaluation/:id', component: evaluation_component_1.EvaluationComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: welcome_component_1.WelcomeComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map