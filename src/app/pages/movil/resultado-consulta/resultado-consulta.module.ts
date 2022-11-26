import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultadoConsultaPageRoutingModule } from './resultado-consulta-routing.module';

import { ResultadoConsultaPage } from './resultado-consulta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultadoConsultaPageRoutingModule
  ],
  declarations: [ResultadoConsultaPage]
})
export class ResultadoConsultaPageModule {}
