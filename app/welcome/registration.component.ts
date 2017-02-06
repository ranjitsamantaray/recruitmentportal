import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Candidate } from '../model/candidate';
import { Skill } from '../model/skill';
import { SkillService } from '../services/skill.services';

@Component ({
  selector: 'registration',
  templateUrl: './app/welcome/registration.html'
})

export class RegistrationComponent implements OnInit {
  public candidate: Candidate;
  public skills = [
    {Skill: 'Mainframe'},
    {Skill: '.Net'},
    {Skill: 'Java'},
    {Skill: 'BizTalk'},
    {Skill: 'Architecture'}
  ];

  constructor(
    private skillService: SkillService,
    private router: Router){  }

  ngOnInit() {
    this.candidate = {
    email: '',
    password: '',
    name: '',
    phone: '',
    exp: null,
    skill: '',
    resume: ''
    }
  }

  gotoSuccessPage() {
    this.router.navigate(['registrationsuccess']);
  }

}
