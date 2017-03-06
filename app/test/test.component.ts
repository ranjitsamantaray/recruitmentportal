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
    this.getQuetions();
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event){
    this.gotoSubmitTest();
    localStorage.removeItem('id_token');
    this.router.navigate(['testsuccess']);
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event){
    this.gotoSubmitTest();
    localStorage.removeItem('id_token');
    this.router.navigate(['testsuccess']);
  }

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event){
    return false;
  }

  @HostListener('copy', ['$event'])
  onCopy(event){
    console.log('Copy not allowed');
    return false;
  }

  @HostListener('cut', ['$event'])
  onCut(event){
    console.log('Cut not allowed');
    return false;
  }

  @HostListener('paste', ['$event'])
  onPaste(event){
    console.log('Paste not allowed');
    return false;
  }

  getQuetions(){
    this._questionService.getQuestions()
    .subscribe(questions => {
      this.questions = questions;
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
      localStorage.removeItem('id_token');
      this.router.navigate(['testsuccess']);
    },error => this.errorMessage = <any>error);
  }
}
