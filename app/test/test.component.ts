import { Component ,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../Recruitment/Questions/Questions';
import { QuestionsMethods } from '../Services/Questions.service';
import { PlatformLocation } from '@angular/common'

@Component ({
  selector: 'test',
  templateUrl: './app/test/test.html'
})

export class TestComponent implements OnInit {
  router: Router;
  public questions: Question[];
  errorMessage : string;
  public show : boolean;
  public message:string;
  public length :number;
  public index:number;

  constructor(_router: Router, private _questionService : QuestionsMethods,private location: PlatformLocation){  
  this.router = _router;
  location.onPopState(() => {
        this.gotoSubmitTest();
      
    });
  this.index=0;
  }

  ngOnInit() {
    this.getQuetions();
    
  }
  getQuetions(){
    this._questionService.getQuestions()
    .subscribe(questions => this.questions = questions,
    error => {
       alert(error);
       localStorage.removeItem('id_token');
       this.router.navigate(['testlogin']);
      });
    this.show = false;
  }
  gotoSaveTest() {
    this.show = true;
  }


  gotoSubmitTest() {
     this._questionService.saveQuestions(this.questions)
    .subscribe(can => {
      localStorage.removeItem('id_token');
      this.router.navigate(['testsuccess']);
    },error => this.errorMessage = <any>error); 
  }
}
