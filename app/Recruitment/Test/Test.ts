export class Test{
QuestionID : string;
Question : string;
Answer : string;
Status : string;

constructor(id : string, question : string, answer : string, status : string)
{
this.QuestionID = id;
this.Question = question;
this.Answer = answer;
this.Status = status;
}
}