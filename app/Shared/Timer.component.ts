import { Component,Output,EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Rx';
//import {TestComponent} from '../test/test.component';
@Component({
  selector: 'my-timer',
  template: `
        {{mm}}:{{ss}}
             `,
  //directives: [TestComponent],
})
export class TimerComponent  { 

  @Output() done: EventEmitter<boolean> = new EventEmitter<boolean>();

  name = 'Angular';
  public subscription:any;
   count=1; 
   public hh:String='00';
   public mm=59;
   public mm2=60;
   public ss=59;
   public ss2=60
   public ticks=0;
    ngOnInit(){
    let timer = Observable.timer(0,1000);
   this.subscription= timer.subscribe(t=>{this.send(t)});
    //this.send(this.ticks);
  }
  //this.ss=this.ss-this.ticks;
  send(n:number){
    this.ss=this.ss2-n;
    if (this.ss == 0){
      this.count+=1;
      this.ss2=60*this.count;
     
      if(this.mm == 5 && this.ss==0)
         alert("you have only 5 minutes left");
      this.mm=this.mm2-this.count;
      if(this.mm == 0){
        this.done.next();
        this.ngOnDestroy();
      }
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
