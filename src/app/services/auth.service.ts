import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(loginData:any){
    return new Observable((subs)=>{
      subs.next("");
      subs.complete();
    })
    
  }
}
