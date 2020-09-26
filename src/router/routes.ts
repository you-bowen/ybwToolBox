import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/mainPage.vue') },
      { path: '/settings', component: () => import('pages/settings.vue') },
      { path: '/test', component: () => import('pages/test.vue') },
      { path: '/check', component: () => import('pages/check.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
