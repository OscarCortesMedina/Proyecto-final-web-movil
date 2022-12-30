import { Component, OnInit } from '@angular/core';
import { ApplicationConfig } from '@angular/platform-browser';
import { AppService } from 'src/app/config/app.service';

@Component({
  selector: 'app-detalle-consulta',
  templateUrl: './detalle-consulta.page.html',
  styleUrls: ['./detalle-consulta.page.scss'],
})
export class DetalleConsultaPage implements OnInit {

  isPhone = false;
  diagnostico =false;
  constructor(private appService:AppService) {
    this.isPhone = this.appService.isPhone;
   }

  ngOnInit() {
  }

}
