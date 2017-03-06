import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SummaryMethods } from '../Services/Summary.service';
import { Candidate } from '../Recruitment/Candidate/Candidate';
import { SkillMethods } from '../Services/Skills.service';
import { Skill } from '../Recruitment/Skill/Skill';


@Component ({
  selector: 'summary',
  templateUrl: './app/internal/summary.html'
})

export class SummaryComponent implements OnInit {
  router: Router;
  public candidates : Candidate[];
  public skills: Skill[];
  errorMessage : string;  

  constructor(_router: Router, private _summaryService : SummaryMethods,
  private _skillService : SkillMethods){  
  this.router = _router;
  }

  ngOnInit() {
    this._skillService.getSkills().subscribe(skills => this.skills = skills,
        error => this.errorMessage = <any>error);
    this._summaryService.getSummary().subscribe(candidates => this.candidates = candidates,
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


