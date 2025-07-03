import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'devacess',
    loadComponent: () => import('./devacess/devacess.page').then( m => m.DevacessPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'criar-tarefa',
    loadComponent: () => import('./criatarefa/criatarefa.page').then( m => m.CriatarefaPage),
    canActivate: [authGuard]
  },
  {
    path: 'lista-tarefas',
    loadComponent: () => import('./lista-tarefas/lista-tarefas.page').then( m => m.ListaTarefasPage),
    canActivate: [authGuard]
  },
  {
    path: 'progresso-tarefa',
    loadComponent: () => import('./progresso-tarefa/progresso-tarefa.page').then( m => m.ProgressoTarefaPage),
    canActivate: [authGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.page').then( m => m.DashboardPage)
  },
];
