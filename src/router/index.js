import { createRouter, createWebHistory } from 'vue-router';
import Catalog from '@/components/CatalogPage.vue';
import ProductPage from '@/components/ProductPage.vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie';
import HomeView from '@/views/MainPageView.vue';
import MainPage from '@/components/MainPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: Catalog,
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductPage,
  },
  {
    path: '/profile',
    component: MainPage,
    beforeEnter: (to, from, next) => {
      const token = Cookies.get('Authorization');

      if (!token) {
        next('/login');
      } else {
        next();
      }
    },
  },
  {
    path: '/login',
    component: () => import('@/components/LoginPage.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    component: () => import('@/components/RegisterPage.vue'),
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
