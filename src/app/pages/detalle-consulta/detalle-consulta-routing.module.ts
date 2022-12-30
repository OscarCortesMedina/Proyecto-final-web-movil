import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleConsultaPage } from './detalle-consulta.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleConsultaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleConsultaPageRoutingModule {}
