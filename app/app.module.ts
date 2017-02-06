import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './welcome/registration.component';
import { WelcomeStaticComponent } from './welcome/static.component';
import { RegistrationSuccessComponent } from './welcome/success.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './internal/login.component';
import { TestLoginComponent } from './test/testlogin.component';
import { TestComponent } from './test/test.component';
import { SummaryComponent } from './internal/summary.component';
import { TestSuccessComponent } from './test/testsuccess.component';
import { EvaluationComponent } from './internal/evaluation.component';
import { SkillService } from './services/skill.services';

@NgModule ({
  imports: [ BrowserModule, routing, HttpModule, FormsModule ],
  declarations: [ AppComponent,
                  RegistrationComponent,
                  WelcomeStaticComponent,
                  RegistrationSuccessComponent,
                  WelcomeComponent,
                  LoginComponent,
                  TestLoginComponent,
                  TestComponent,
                  TestSuccessComponent,
                  SummaryComponent,
                  EvaluationComponent
                ],
  providers: [ SkillService ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
