import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasswordInputPage } from './password-input.page';

const routes: Routes = [
  {
    path: '',
    component: PasswordInputPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordInputPageRoutingModule {}
