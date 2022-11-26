import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuerpoPageRoutingModule } from './cuerpo-routing.module';

import { CuerpoPage } from './cuerpo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuerpoPageRoutingModule
  ],
  declarations: [CuerpoPage]
})
export class CuerpoPageModule {}
