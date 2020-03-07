import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinksPageRoutingModule } from './links-routing.module';

import { LinksPage } from './links.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LinksPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [LinksPage]
})
export class LinksPageModule {}
