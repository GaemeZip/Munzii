import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasswordEnterPage } from './password-enter.page';

const routes: Routes = [
  {
    path: '',
    component: PasswordEnterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordEnterPageRoutingModule {}
