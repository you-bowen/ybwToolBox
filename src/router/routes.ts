import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/snippet.vue') },
      { path: '/timeRoute', component: () => import('pages/timeRoute.vue') },
      { path: '/note', component: () => import('pages/note.vue') },
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
