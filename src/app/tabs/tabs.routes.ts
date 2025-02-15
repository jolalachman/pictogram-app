import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../auth.guard';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('./components/tab1/tab1.page').then(m => m.Tab1Page),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('./components/tab2/tab2.page').then(m => m.Tab2Page),
      },
      {
        path: 'auth',
        loadComponent: () =>
          import('./components/auth/auth.page').then(
            m => m.AuthPage
          ),
      },
      {
        path: 'info',
        loadComponent: () =>
          import('./components/info/info.component').then(
            m => m.InfoComponent
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: '/tabs/tab1',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];
