import { Injectable, } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  isPhone=false;
  tiposDeLesion =[{id:1,value:'Mácula'},
  {id:2,value:'Pápula'},
  {id:3,value:'Parche'},
  {id:4,value:'Placa'},
  {id:5,value:'Nódulo'},
  {id:6,value:'Ampolla'},
  {id:7,value:'Úlcera'},
  {id:8,value:'Vesícula'}]
  formas =[{id:1,value:'Anillo'},
  {id:2,value:'Domo'},
  {id:3,value:'Ovalada'},
  {id:4,value:'Redonda'},
  {id:5,value:'Indefinida'},
  {id:6,value:'Enrollada'}]
  numeroDeLesiones =[{id:1,value:'Solitaria'},
  {id:2,value:'Múltiple'},
  {id:3,value:'Recurrente'},
  {id:4,value:'Diseminada'}]
  distribucion =[{id:1,value:'Asimétrica'},
  {id:2,value:'Confluente'},
  {id:3,value:'Simétrica'},
  {id:4,value:'Esparcida'}]

  constructor(private platform:Platform) { 

    if(this.platform.is("mobile") || this.platform.is('mobileweb')) {
      this.isPhone = true;
    } else {
      this.isPhone = false;
    }
    console.log("Is Phone: ",this.isPhone);
  }
}
