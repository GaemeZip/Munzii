import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoEditFormPage } from './todo-edit-form.page';

const routes: Routes = [
  {
    path: '',
    component: TodoEditFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoEditFormPageRoutingModule {}
