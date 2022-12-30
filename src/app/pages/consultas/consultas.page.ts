import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/config/app.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.page.html',
  styleUrls: ['./consultas.page.scss'],
})
export class ConsultasPage implements OnInit {

  isPhone = false;
  constructor(private appService:AppService) {
    this.isPhone = this.appService.isPhone;
   }

  ngOnInit() {
  }

}
