import { Injectable, } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  isPhone=false;

  constructor(private platform:Platform) { 

    if(this.platform.is("mobile") || this.platform.is('mobileweb')) {
      this.isPhone = true;
    } else {
      this.isPhone = false;
    }
    console.log("Is Phone: ",this.isPhone);
  }
}
