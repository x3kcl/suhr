import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GelesenPageRoutingModule } from './gelesen-routing.module';

import { GelesenPage } from './gelesen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GelesenPageRoutingModule
  ],
  declarations: [GelesenPage]
})
export class GelesenPageModule {}
