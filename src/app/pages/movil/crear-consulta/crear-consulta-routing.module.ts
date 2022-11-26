import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearConsultaPage } from './crear-consulta.page';

const routes: Routes = [
  {
    path: '',
    component: CrearConsultaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearConsultaPageRoutingModule {}
