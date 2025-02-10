import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      name: 'main',
      path: '/',
      component: () => import('@/views/MainPage.vue'),
    },
    {
      name: 'genres',
      path: '/genres',
      component: () => import('@/views/GenresPage.vue'),
    },
    {
      name: 'genre',
      path: '/genres/:name',
      component: () => import('@/views/GenrePage.vue'),
      props: true,
    },
    {
      name: 'movie',
      path: '/:movie',
      component: () => import('@/views/MoviePage.vue'),
      props: true,
    },
    {
      name: 'account',
      path: '/my-account',
      component: () => import('@/views/AccountPage.vue'),
      props: true,
    },
  ],
})

export default router
