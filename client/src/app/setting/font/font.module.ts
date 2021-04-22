import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FontPageRoutingModule } from './font-routing.module';

import { FontPage } from './font.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontPageRoutingModule
  ],
  declarations: [FontPage]
})
export class FontPageModule {}
