import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/config/app.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  isPhone = false;
  constructor(private appService:AppService) {
    this.isPhone = this.appService.isPhone;
   }

  ngOnInit() {
  }

  

}
