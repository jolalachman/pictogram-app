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
        path: 'sign-in',
        loadComponent: () =>
          import('./components/auth/pages/login/login.page').then(
            m => m.LoginPage
          ),
        ...canActivate(redirectLoggedinToTab1),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/auth/pages/register/register.page').then(
            m => m.RegisterPage
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
];
