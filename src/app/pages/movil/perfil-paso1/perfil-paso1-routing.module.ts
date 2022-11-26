import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilPaso1Page } from './perfil-paso1.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilPaso1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilPaso1PageRoutingModule {}
