import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpressumComponent } from './impressum/impressum.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ImpressumComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    ImpressumComponent
  ]
})
export class ComponentsModule { }
