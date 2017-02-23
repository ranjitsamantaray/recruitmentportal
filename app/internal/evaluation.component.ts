import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { TestMethods } from '../Services/Test.service';
import { Test } from '../Recruitment/Test/Test';
import { CandidateMethods } from '../Services/Candidate.service';
import { Candidate } from '../Recruitment/Candidate/Candidate';

@Component ({
  selector: 'evaluation',
  templateUrl: './app/internal/evaluation.html'
})

export class EvaluationComponent implements OnInit {
  router: Router;
  public candidate : Candidate;
  public tests: Test[];
  errorMessage : string;
  public canId : number;
  public show : boolean;
  public Score:number=null;
  public v:any;

  constructor(_router: Router, private _candidateService : CandidateMethods,
  private _testService : TestMethods, private route: ActivatedRoute){  
  this.router = _router;
  //this.v=route.params.switchMap((params: Params));
  }

  ngOnInit() {
    
     this.route.params
    .switchMap((params: Params) =>this._testService.getTest(+params['id'])).subscribe(tests => this.tests = tests,
        error => this.errorMessage = <any>error);

   this.route.params
    .switchMap((params: Params) =>  this._candidateService.getCandidate(+params['id']))
      .subscribe(candidate => this.candidate = candidate,
        error => this.errorMessage = <any>error);
         this.show = false;
  }
  gotoSaveEval()  {
this.show = true;
}
score(v:string, testID : number){
     console.log(v);
     console.log(this.Score);
    if(this.tests[testID].Status == '')
    {
      if(v == 'C'){
        this.tests[testID].Status = 'C';
        this.Score = this.Score + 10;   
      }
      if(v=='P'){
        this.tests[testID].Status = 'P';
        this.Score = this.Score + 5;   
      }       
    }
    else if(this.tests[testID].Status == 'P'){
      if(v=='C'){
        this.tests[testID].Status = 'C';
        this.Score = this.Score + 5;   
      } 
      if(v=='W'){
        this.tests[testID].Status = 'W';
        this.Score = this.Score - 5;   
      }
    }
    else if(this.tests[testID].Status == 'C'){
      if(v=='P'){
        this.tests[testID].Status = 'P';
        this.Score = this.Score - 5;   
      } 
      if(v=='W'){
        this.tests[testID].Status = 'W';
        this.Score = this.Score - 10;   
      }
    }   
    else if(this.tests[testID].Status == 'W'){
      if(v=='P'){
        this.tests[testID].Status = 'P';
        this.Score = this.Score + 5;   
      } 
      if(v=='C'){
        this.tests[testID].Status = 'C';
        this.Score = this.Score + 10;   
      }
    } 
  
}
logout(){
    localStorage.removeItem('id_token');
    localStorage.removeItem('Authlevel');
    this.router.navigate(['login']);
  }


}
