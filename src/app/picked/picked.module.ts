import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickedPageRoutingModule } from './picked-routing.module';

import { PickedPage } from './picked.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickedPageRoutingModule
  ],
  declarations: [PickedPage]
})
export class PickedPageModule {}
