import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilDermatologicoPage } from './perfil-dermatologico.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilDermatologicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilPaso1PageRoutingModule {}
