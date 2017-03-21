import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SummaryMethods } from '../Services/Summary.service';
import { Candidate } from '../Recruitment/Candidate/Candidate';
import { SkillMethods } from '../Services/Skills.service';
import { Skill } from '../Recruitment/Skill/Skill';
import {Consultancy} from '../Recruitment/Consultancy/Consultancy';
import {ConsultancyService} from '../Services/Consultancy.service';
import {FilterComponent } from '../Shared/Filter.component';
import {IMyOptions, IMyDateModel} from 'mydatepicker';
import {Ng2PaginationModule} from 'ng2-pagination';


@Component ({
  selector: 'summary',
  templateUrl: './app/internal/summary.html'
})

export class SummaryComponent implements OnInit {
  router: Router;
  public candidates : Candidate[];
  public skills: Skill[];
  public Consul :Consultancy[];
  errorMessage : string; 
  public date1:string=null;
  public length:number;
  public Name:string=null;
 
  
  
  private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'dd-mm-yyyy',
        height: "24px",
        width: "95%",
        selectionTxtFontSize: "13px",
    };

  constructor(_router: Router, private _summaryService : SummaryMethods,private _consultancyService : ConsultancyService,
  private _skillService : SkillMethods){  
  this.router = _router;
  
  }

  onDateChanged(event: IMyDateModel) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
        if(event.formatted){
        this.date1=String(event.formatted);
        var date[] = this.date1.split('-');
        this.date1 = date[2]+"-"+date[1]+"-"+date[0];
        }
        else
        this.date1=null;
    } 

  ngOnInit() {
    this._skillService.getSkills().subscribe(skills => this.skills = skills,
        error => this.errorMessage = <any>error);

    this._consultancyService.getConsultancy().subscribe(cons=>this.Consul=cons,
      error => this.errorMessage = <any>error);

    this._summaryService.getSummary().subscribe(candidates => {this.candidates = candidates
      for(let i=0;i<this.candidates.length;i++){
      this.candidates[i].Consultancy=String(this.Consul[Number(this.candidates[i].Consultancy)-1].Name);
      if (this.candidates[i].Score)
        this.candidates[i].Score=this.candidates[i].Score/10;
      
    }
    
},
        error => {
       alert(error);
       localStorage.removeItem('id_token');
       this.router.navigate(['login']);
      });
    
  }
  

logout(){
    localStorage.removeItem('id_token');
    this.router.navigate(['login']);
  }
}


