import { Headers } from '@angular/http';

export const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');
if(JSON.parse(localStorage.getItem('id_token')).token){
    var token=JSON.parse(localStorage.getItem('id_token')).token;
    contentHeaders.append('acc-token',`${token}`);
    
}
