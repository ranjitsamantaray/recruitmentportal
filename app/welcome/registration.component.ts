import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateMethods } from '../Services/Candidate.service';
import { Candidate } from '../Recruitment/Candidate/Candidate';
import { SkillMethods } from '../Services/Skills.service';
import { Skill } from '../Recruitment/Skill/Skill';
import {Consultancy} from '../Recruitment/Consultancy/Consultancy';
import {ConsultancyService} from '../Services/Consultancy.service';
import {RegCandidate} from '../recruitment/registrationCandidate/RegCandidate';

@Component ({
  selector: 'registration',
  templateUrl: './app/welcome/registration.html'
})

export class RegistrationComponent implements OnInit {
  public candidate : Candidate;
  public skills : Skill[];
  public Consul :Consultancy[];
  errorMessage : string;
  public message:string;
  file : File;
  public today: number = Date.now();
  //public r:any;
  
  constructor(
    private _skillService: SkillMethods, private _candidateService: CandidateMethods, private _consultancyService : ConsultancyService,
    private router: Router){  }

 onChange(event : EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        let files: FileList = target.files;
        this.file = files[0];
       //console.log(this.file); 
  }

  ngOnInit() {
   
    this._skillService.getSkills().subscribe(skills => this.skills = skills,
        error => this.errorMessage = <any>error);
	
    this._consultancyService.getConsultancy().subscribe(cons=>this.Consul=cons,
      error => this.errorMessage = <any>error);

    this.candidate = new Candidate(null,'','','',null,'0',this.today,'0',null,'','',null);
  }
  
  gotoSuccessPage() {   
   if (this.candidate.Email==''){
      this.errorMessage="please enter your Email id";
    }
   
    else if (this.candidate.Name==''){
      this.errorMessage="Please enter your Name";
    }
    else if(this.candidate.Phone==''){
      this.errorMessage="Please enter your Phone number";
    }
    else if(!this.candidate.Experience)
    {
      this.errorMessage="Please enter year of experiance in numbers";
    }
   else if(this.candidate.Skill=='0'){
     this.errorMessage="Please select your skill";
   }
   else if(this.candidate.Consultancy=='0'){
     this.errorMessage="Please select your Consultancy";
   }
   else if(!this.file){
     this.errorMessage="Please upload your resume";
   }
    else if(!this.candidate.Email.match(new RegExp(/^[A-Z0-9a-z._%+-]+@[A-Za-z0-9-.]+.[A-Za-z]{2,4}$/)))
   {
     this.errorMessage="invalid email id eg:xyz@abc.com";
   }
   else if (!this.candidate.Phone.match(new RegExp(/^[0-9]{10}$/))){
     this.errorMessage="invalid Phone number";
   }
   //+(/^[0-9]{1,2}$/)
   else if(!(String(this.candidate.Experience).match(new RegExp(/^[0-9]{0,2}(\.[0-9]{0,1}?)?$/)))){
     this.errorMessage="Invalid years of expreiance entered Eg:3.7";
   }
   
    else{
     //console.log(JSON.stringify(this.candidate));
   this._candidateService.saveCandidate(this.candidate)
   
    .subscribe(can => {
       if(can == "Already Registered"){
       alert("Yo are already registered before !!! contact admin ..");
          }
     else{
       this.router.navigate(['/registrationsuccess']);
       this._candidateService.UploadResume(this.file,this.candidate.Email)
       .subscribe(can => {this.message = can},
       err=>{
         this.errorMessage=err;
       });
        }
            
      },
      error => this.errorMessage = <any>error);

     }
       
    }
     
    
  
}
