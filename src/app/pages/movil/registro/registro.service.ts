import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor() { }

  registro(registerData:any){
    return new Observable((subs)=>{
      subs.next("");
      subs.complete();
    })
    
  }
}
