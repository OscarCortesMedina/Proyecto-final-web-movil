import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrearConsultaService {

  constructor() { }

  crearConulta(crearConsultaData:any){
    console.log(crearConsultaData);
    return new Observable((subs)=>{
      subs.next("");
      subs.complete();
    });
  }
}
