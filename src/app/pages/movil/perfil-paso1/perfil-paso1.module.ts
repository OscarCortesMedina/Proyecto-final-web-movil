import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PerfilPaso1PageRoutingModule } from './perfil-paso1-routing.module';

import { PerfilPaso1Page } from './perfil-paso1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPaso1PageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PerfilPaso1Page]
})
export class PerfilPaso1PageModule {}
