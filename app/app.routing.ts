import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { RegistrationSuccessComponent } from './welcome/success.component';
import { LoginComponent } from './internal/login.component';
import { TestLoginComponent } from './test/testlogin.component';
import { TestComponent } from './test/test.component';
import { SummaryComponent } from './internal/summary.component';
import { TestSuccessComponent } from './test/testsuccess.component';
import { EvaluationComponent } from './internal/evaluation.component';

const appRoutes: Routes = [
  { path: 'home', component: WelcomeComponent },
  { path: 'registrationsuccess', component: RegistrationSuccessComponent },
  { path: 'login', component: LoginComponent},
  { path: 'testlogin', component: TestLoginComponent },
  { path: 'test', component: TestComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'testsuccess', component: TestSuccessComponent},
  { path: 'evaluation', component: EvaluationComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', component: WelcomeComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
