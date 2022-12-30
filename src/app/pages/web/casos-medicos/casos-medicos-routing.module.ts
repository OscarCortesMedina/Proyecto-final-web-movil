import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CasosMedicosPage } from './casos-medicos.page';

const routes: Routes = [
  {
    path: '',
    component: CasosMedicosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasosMedicosPageRoutingModule {}
