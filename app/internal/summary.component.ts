import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateMethods } from '../Services/Candidate.service';
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

  constructor(_router: Router, private _candidateService : CandidateMethods,
  private _skillService : SkillMethods){  
  this.router = _router;
  }

  ngOnInit() {
    this._skillService.getSkills().subscribe(skills => this.skills = skills,
        error => this.errorMessage = <any>error);
    this._candidateService.getCandidates().subscribe(candidates => this.candidates = candidates,
        error => this.errorMessage = <any>error);
  }
logout(){
    localStorage.removeItem('id_token');
    localStorage.removeItem('Authlevel');
    this.router.navigate(['login']);
  }
}


