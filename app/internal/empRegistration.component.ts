import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute ,Params } from '@angular/router';
import { Candidate } from '../Recruitment/Candidate/Candidate';
import { EmployeeMethods } from '../Services/Employee.service';
import { Employee } from '../Recruitment/Employee/Employee';
import { SkillMethods } from '../Services/Skills.service';
import { Skill } from '../Recruitment/Skill/Skill';

@Component ({
  selector: 'empregistration',
  templateUrl: './app/internal/empRegistration.html'
})

export class EmpRegistrationComponent implements OnInit {
  router: Router;
  public candidates : Candidate[];
  errorMessage : string;
  public emp : Employee;
  public skills : Skill[];
  
  constructor(_router: Router, private _empService : EmployeeMethods, private _skillService: SkillMethods,
  private route: ActivatedRoute){  
  this.router = _router;  
  }

    ngOnInit() {
        this.emp = new Employee('','','','','');
        this._skillService.getSkills().subscribe(skills => this.skills = skills,
        error => this.errorMessage = <any>error);              
    }

    regEmployee(){     
        this.emp.Role = 'Admin';   

        if (this.emp.Email==''){
            this.errorMessage="please enter your Email id";
        }   
        else if (this.emp.Name==''){
            this.errorMessage="Please enter your Name";
        }
        else if(this.emp.Skill=='0'){
            this.errorMessage="Please select your skill";
        }
        else if(!this.emp.Email.match(new RegExp(/^[A-Z0-9a-z._%+-]+@[A-Za-z0-9-.]+.[A-Za-z]{2,4}$/)))
        {
            this.errorMessage="invalid email id eg:xyz@abc.com";
        }
        else {
            this._empService.registerEmployee(this.emp).subscribe(can => {
            if(can == "Already Registered"){
                alert("Yo are already registered before !!! contact admin ..");
            }
            else{
                this.router.navigate(['/login']);       
            }
                
            },
            error => this.errorMessage = <any>error); 
        }
    }
    
    logout(){        
        localStorage.removeItem('id_token');
        localStorage.removeItem('Authlevel');
        this.router.navigate(['login']);
    }


}