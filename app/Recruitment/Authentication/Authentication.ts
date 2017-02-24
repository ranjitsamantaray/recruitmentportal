export class Authentication{
ID : number;
Email : string;
Password : string;
AuthLevel : number;

constructor(id : number, email : string, password : string, authLevel : number)
{
this.ID = id;
this.Email = email;
this.Password = password;
this.AuthLevel = authLevel;
}
}