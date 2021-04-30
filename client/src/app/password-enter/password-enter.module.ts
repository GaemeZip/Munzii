import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordEnterPageRoutingModule } from './password-enter-routing.module';

import { PasswordEnterPage } from './password-enter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordEnterPageRoutingModule
  ],
  declarations: [PasswordEnterPage]
})
export class PasswordEnterPageModule {}
