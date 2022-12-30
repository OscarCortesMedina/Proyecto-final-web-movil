import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleConsultaPageRoutingModule } from './detalle-consulta-routing.module';

import { DetalleConsultaPage } from './detalle-consulta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleConsultaPageRoutingModule
  ],
  declarations: [DetalleConsultaPage]
})
export class DetalleConsultaPageModule {}
