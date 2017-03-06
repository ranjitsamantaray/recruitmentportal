import { NgModule,APP_INITIALIZER } from '@angular/core';
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
import { PrivateComponent } from './test/Private.component';
import { SkillMethods, SkillDummyService, SkillService } from './Services/Skills.service';
import { CandidateMethods, CandidateService, CandidateDummyService } from './Services/Candidate.service';
import { AuthCandidateMethods, AuthCandidateService, AuthCandidateDummyService } from './Services/AuthenticateCandidate.service';
import { TimerComponent } from './Shared/Timer.component';
import { QuestionsMethods, QuestionsService, QuestionsDummyService } from './Services/Questions.service';
import { AuthUserMethods,AuthUserService,AuthUserDummyService } from './Services/AuthenticateUser.service';
import { TestMethods,TestService,TestDummyService } from './Services/Test.service';
import { ConsultancyService} from './Services/Consultancy.service';
import { Login, LoginDummy, LoginReal } from './Services/Login.service';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthGuard } from './auth.guard';
import { ConfigService } from './config/config.service';
import { HandleError,HandleErrorService } from './Services/HandleError.service';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { EmpRegistrationComponent } from  './internal/empRegistration.component';
import { EmployeeMethods, EmployeeService} from './Services/Employee.service';
import { SummaryMethods,SummaryService,SummayDummyService } from './Services/Summary.service';

@NgModule ({
  imports: [ BrowserModule, routing, HttpModule, FormsModule,],
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
                  EvaluationComponent,
                  TimerComponent,
                  EmpRegistrationComponent
                ],  
  bootstrap: [ AppComponent ],
  providers: [{provide:SkillMethods, useClass:SkillService},
              {provide:CandidateMethods, useClass:CandidateService},
              {provide:AuthCandidateMethods, useClass:AuthCandidateDummyService},
              {provide:QuestionsMethods, useClass:QuestionsService},
              {provide:AuthUserMethods, useClass:AuthUserDummyService},
              {provide:TestMethods, useClass:TestDummyService},
              {provide:Login, useClass:LoginReal},ConsultancyService,
              {provide:HandleError, useClass:HandleErrorService},
              //{provide: LocationStrategy, useClass: HashLocationStrategy},
              {provide:SummaryMethods, useClass:SummaryService},
              {provide: EmployeeMethods, useClass: EmployeeService},
              AuthGuard, ...AUTH_PROVIDERS,
              ConfigService,
              { provide: APP_INITIALIZER,
                useFactory: (config: ConfigService) => () => config.load(),
                deps: [ConfigService],
                multi: true }  
  ]
})

export class AppModule {}
