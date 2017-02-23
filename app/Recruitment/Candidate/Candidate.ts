export class Candidate{
ID : number;
Name : string;
Email : string;
Phone : string;
Experience : number;
Skill : string;
Registration_date: number;
Consultancy : string;
Score :number;
Status : string;
Resume : string;
LogikScore : number;

constructor(id : number,  email : string, name : string,phone : string, 
experience : number, skill : string,Reg_date: number,cosultancy: string,Score:number,Status: string,resume : string, logikScore: number)
constructor(id: number,  email : string,name : string, phone : string, 
experience : number, skill : string,Reg_date: number,cosultancy: string,Score?:number,Status?: string,resume? : string, logikScore?: number)
{
this.ID = id;
this.Name = name;
this.Email = email;
this.Phone = phone;
this.Experience = experience;
this.Skill = skill;
this.Registration_date=Reg_date;
this.Consultancy = cosultancy;
this.Score = Score;
this.Status = status;
this.Resume = resume;
this.LogikScore = logikScore;
}
}