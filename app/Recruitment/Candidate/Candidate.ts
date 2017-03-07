export class Candidate{
ID : number;
Name : string;
Email : string;
Phone : string;
Experience : number;
Skill : string;
Registration_date: string;
Consultancy : string;
Score :number;
Status : string;
Resume : string;
LogikScore : number;

constructor(id : number,  email : string, name : string,phone : string, 
experience : number, skill : string,reg_date: string,cosultancy: string,score:number,status: string,resume : string, logikScore: number)
constructor(id: number,  email : string,name : string, phone : string, 
experience : number, skill : string,reg_date: string,cosultancy: string,score?:number,status?: string,resume? : string, logikScore?: number)
{
this.ID = id;
this.Name = name;
this.Email = email;
this.Phone = phone;
this.Experience = experience;
this.Skill = skill;
this.Registration_date=reg_date;
this.Consultancy = cosultancy;
this.Score = score;
this.Status = status;
this.Resume = resume;
this.LogikScore = logikScore;
}
}