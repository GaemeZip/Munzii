import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarTabPageRoutingModule } from './calendar-tab-routing.module';

import { CalendarTabPage } from './calendar-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarTabPageRoutingModule
  ],
  declarations: [CalendarTabPage]
})
export class CalendarTabPageModule {}
