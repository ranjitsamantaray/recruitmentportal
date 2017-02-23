import { Component ,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../Recruitment/Questions/Questions';
import { QuestionsMethods } from '../Services/Questions.service';

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

  constructor(_router: Router, private _questionService : QuestionsMethods){  
  this.router = _router;
  //this.questions = new <Question>(null,'','','');
  }

  ngOnInit() {
    this.getQuetions();
    //this.questions[this.questions.length] = new Question('','','');
  }
  getQuetions(){
    this._questionService.getQuestions()
    .subscribe(questions => this.questions = questions,
    //this.length= (questions[questions.length].Answers).length,
    error => this.errorMessage = <any>error);
    this.show = false;
  }
  gotoSaveTest() {
    this.show = true;
  }

  gotoReviewTest() {
    //this.router.navigate(['review']);
  }

  gotoSubmitTest() {
    //debugger;
     this._questionService.saveQuestions(this.questions)
    .subscribe(can => {
      //if (can == "") {
      //this.message=(can.Status);
      this.router.navigate(['testsuccess']);
    },error => this.errorMessage = <any>error); 
   //if(confirm("Submit will close the test are sure you want to continue?")){
    //localStorage.removeItem('id_token');
   // localStorage.removeItem('Authlevel');
    //this.router.navigate(['testsuccess']);
  
  }
}
