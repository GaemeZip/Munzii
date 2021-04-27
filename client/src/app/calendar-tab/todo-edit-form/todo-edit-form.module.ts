import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodoEditFormPageRoutingModule } from './todo-edit-form-routing.module';

import { TodoEditFormPage } from './todo-edit-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoEditFormPageRoutingModule
  ],
  declarations: [TodoEditFormPage]
})
export class TodoEditFormPageModule {}
