import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { TestMethods } from '../Services/Test.service';
import { Test } from '../Recruitment/Test/Test';
import { Eval } from '../Recruitment/Eval';
import { CandidateMethods } from '../Services/Candidate.service';
import { Candidate } from '../Recruitment/Candidate/Candidate';
import { SubmitTest } from '../Recruitment/SubmitTest';

@Component ({
  selector: 'evaluation',
  templateUrl: './app/internal/evaluation.html'
})

export class EvaluationComponent implements OnInit {
  router: Router;
  //public candidate : Candidate;
  public tests: Eval;
  errorMessage : string;
  public email : string;
  public show : boolean;
  public Score:number=null;
  public v:any;
  public sub : SubmitTest = new SubmitTest();
  
  constructor(_router: Router, private _candidateService : CandidateMethods,
  private _testService : TestMethods, private route: ActivatedRoute){  
  this.router = _router;  
  this.tests = new Eval();
  }

  ngOnInit() {    
     this.route.params.subscribe
     ((params : Params) => { this.email = params['Email']});
     console.log(this.email);
     this.route.params
    .switchMap((params: Params) =>this._testService.getTest(params['id']))
    .subscribe(tests => this.tests = tests,
     error => this.errorMessage = <any>error);   
     console.log(this.tests);  
  }
  gotoSaveEval()  {
    this.show = true;
  }
  gotoSubmitEval()
  {
    this.sub.Candidate_ID = this.tests.recordset.ID;
    this.sub.Evaluation = this.tests.rec;
    this.sub.Score = this.Score;
    this._testService.saveTest(this.sub)
    .subscribe(can => {      
      this.router.navigate(['summary']);
    },error => this.errorMessage = <any>error);
  }
  score(v:string, testID : number){
     console.log(v);
     console.log(this.Score);
    if(this.tests.rec[testID].Status == '')
    {
      if(v == 'C'){
        this.tests.rec[testID].Status = 'C';
        this.Score = this.Score + 10;   
      }
      if(v=='P'){
        this.tests.rec[testID].Status = 'P';
        this.Score = this.Score + 5;   
      }       
    }
    else if(this.tests.rec[testID].Status == 'P'){
      if(v=='C'){
        this.tests.rec[testID].Status = 'C';
        this.Score = this.Score + 5;   
      } 
      if(v=='W'){
        this.tests.rec[testID].Status = 'W';
        this.Score = this.Score - 5;   
      }
    }
    else if(this.tests.rec[testID].Status == 'C'){
      if(v=='P'){
        this.tests.rec[testID].Status = 'P';
        this.Score = this.Score - 5;   
      } 
      if(v=='W'){
        this.tests.rec[testID].Status = 'W';
        this.Score = this.Score - 10;   
      }
    }   
    else if(this.tests.rec[testID].Status == 'W'){
      if(v=='P'){
        this.tests.rec[testID].Status = 'P';
        this.Score = this.Score + 5;   
      } 
      if(v=='C'){
        this.tests.rec[testID].Status = 'C';
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
