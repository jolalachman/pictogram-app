import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { canActivate, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectLoggedinToTab1 = () => redirectLoggedInTo(['tabs/tab1']);

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
        ...canActivate(redirectLoggedinToTab1),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
  {
    path: 'add-tile',
    loadComponent: () => import('./components/tab1/add-tile/add-tile.page').then( m => m.AddTilePage)
  },

];
