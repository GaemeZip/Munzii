import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordInputPageRoutingModule } from './password-input-routing.module';

import { PasswordInputPage } from './password-input.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordInputPageRoutingModule
  ],
  declarations: [PasswordInputPage]
})
export class PasswordInputPageModule {}
