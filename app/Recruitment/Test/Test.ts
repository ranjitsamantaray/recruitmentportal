export class Test{
CandidateID : number;
Question : string;
Answer : string;
Status : string;

constructor(id : number, question : string, answer : string, status : string)
{
this.CandidateID = id;
this.Question = question;
this.Answer = answer;
this.Status = status;
}
}