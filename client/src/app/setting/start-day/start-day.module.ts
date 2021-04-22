import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartDayPageRoutingModule } from './start-day-routing.module';

import { StartDayPage } from './start-day.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartDayPageRoutingModule
  ],
  declarations: [StartDayPage]
})
export class StartDayPageModule {}
