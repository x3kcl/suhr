import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpressumComponent } from './impressum/impressum.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ImpressumComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  exports: [
    ImpressumComponent
  ]
})
export class ComponentsModule { }
