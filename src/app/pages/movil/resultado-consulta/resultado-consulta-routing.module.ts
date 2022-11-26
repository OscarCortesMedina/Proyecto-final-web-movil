import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultadoConsultaPage } from './resultado-consulta.page';

const routes: Routes = [
  {
    path: '',
    component: ResultadoConsultaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultadoConsultaPageRoutingModule {}
