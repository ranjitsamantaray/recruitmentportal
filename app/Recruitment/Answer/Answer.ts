export class Answer{
Question_Id : string;
Question : string;
Answer : string;

constructor(id : string,  question : string, answer : string)
{
this.Question_Id = id;
this.Question = question;
this.Answer = answer;
}
}