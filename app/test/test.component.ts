import { Component ,OnInit,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../Recruitment/Questions/Questions';
import { QuestionsMethods } from '../Services/Questions.service';
import { PlatformLocation } from '@angular/common'
import {Location} from '@angular/common';

@Component ({
  selector: 'test',
  templateUrl: './app/test/test.html',
})

export class TestComponent implements OnInit {

  router: Router;
  public questions: Question[];
  errorMessage : string;
  public show : boolean;
  public message:string;
  public length :number;
  public index:number;
  public confirmClose:boolean;


  constructor(_router: Router, private _questionService : QuestionsMethods,private location1: PlatformLocation,
  private location: Location){
    this.router = _router;
    this.index=0;
  }

  ngOnInit() {
    //console.log('token:' + JSON.parse(localStorage.getItem('id_token')).token);
    console.log(localStorage.getItem('id_token'));
    this.getQuetions();
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event){
    console.log('Backbutton pressed!!');
    this.gotoSubmitTest();
    localStorage.removeItem('id_token');
    this.router.navigate(['testsuccess']);
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event){
    console.log('Refresh pressed!!');
    this.gotoSubmitTest();
    localStorage.removeItem('id_token');
    this.router.navigate(['testsuccess']);
  }

  getQuetions(){
    this._questionService.getQuestions()
    .subscribe(questions => {
      this.questions = questions;
      console.log(questions);
    },
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
      console.log('Submitting answer');
      localStorage.removeItem('id_token');
      this.router.navigate(['testsuccess']);
    },error => this.errorMessage = <any>error);
  }
}
