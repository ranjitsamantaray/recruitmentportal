export class RegCandidate{

    Email :  string;
    Name: string;
    Phone : string;
    Experiance: number;
    Skill : string;
    Consultantanc: string;  
    
 constructor(email : string, name : string, phone : string, exp : number, skill : string, consul : string)

 constructor(email : string, name : string, phone: string,exp:number,skill:string,consul:string){
  // this.ID=id;
   this.Email=email;
   this.Name=name;
   this.Phone=phone;
   this.Experiance=exp;
   this.Skill=skill;
   this.Consultantanc=consul;
 }
}