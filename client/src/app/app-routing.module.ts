import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'theme',
    loadChildren: () => import('./setting/theme/theme.module').then(m => m.ThemePageModule)
  },
  {
    path: 'font',
    loadChildren: () => import('./setting/font/font.module').then(m => m.FontPageModule)
  },
  {
    path: 'start-day',
    loadChildren: () => import('./setting/start-day/start-day.module').then(m => m.StartDayPageModule)
  },
  {
    path: 'password',
    loadChildren: () => import('./setting/password/password.module').then(m => m.PasswordPageModule)
  },
  {
    path: 'join',
    loadChildren: () => import('./join/join.module').then(m => m.JoinPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./setting/settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'password-input',
    loadChildren: () => import('./setting/password-input/password-input.module').then( m => m.PasswordInputPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./setting/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'todo',
    loadChildren: () => import('./todo/todo.module').then( m => m.TodoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
