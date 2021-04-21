import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FontPage } from './font.page';

const routes: Routes = [
  {
    path: '',
    component: FontPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FontPageRoutingModule {}
