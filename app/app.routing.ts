import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivateComponent } from './test/Private.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegistrationSuccessComponent } from './welcome/success.component';
import { LoginComponent } from './internal/login.component';
import { TestLoginComponent } from './test/testlogin.component';
import { TestComponent } from './test/test.component';
import { SummaryComponent } from './internal/summary.component';
import { TestSuccessComponent } from './test/testsuccess.component';
import { EvaluationComponent } from './internal/evaluation.component';
//import {EmpRegistrationComponent} from  './internal/empRegistration.component'
import {AuthGuard} from './auth.guard';

const appRoutes: Routes = [
  { path: 'home', component: WelcomeComponent },
  { path: 'registrationsuccess', component: RegistrationSuccessComponent},
  //{ path: 'empregistration', component: EmpRegistrationComponent},
  { path: 'login', component: LoginComponent},
  { path: 'testlogin', component: TestLoginComponent },
  { path: 'test', component: TestComponent,canActivate :[AuthGuard] },
  { path: 'summary', component: SummaryComponent },
  { path: 'testsuccess', component: TestSuccessComponent},
  { path: 'evaluation/:id', component: EvaluationComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', component: WelcomeComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
