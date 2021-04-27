import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarTabPage } from './calendar-tab.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarTabPage,
    children: [
      {
        path: 'todo',
        loadChildren: () => import('../calendar-tab/todo/todo.module').then( m => m.TodoPageModule)
      },
      {
        path: 'timeline',
        loadChildren: () => import('../calendar-tab/timeline/timeline.module').then( m => m.TimelinePageModule)
      },
      {
        path: 'memo',
        loadChildren: () => import('../calendar-tab/memo/memo.module').then( m => m.MemoPageModule)
      },
      {
        path: '',
        redirectTo: 'todo',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'todo',
    pathMatch: 'full'
  },
  {
    path: 'todo-form',
    loadChildren: () => import('./todo-form/todo-form.module').then( m => m.TodoFormPageModule)
  },
  {
    path: 'todo-edit-form',
    loadChildren: () => import('./todo-edit-form/todo-edit-form.module').then( m => m.TodoEditFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarTabPageRoutingModule {}
