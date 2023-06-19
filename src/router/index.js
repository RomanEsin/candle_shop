import { createRouter, createWebHistory } from 'vue-router';
import Catalog from '@/components/CatalogPage.vue';
import ProductPage from '@/components/ProductPage.vue';
import AboutUs from '@/components/AboutUs.vue';
import UserProfile from '@/components/UserProfile.vue';
import Cookies from 'js-cookie';
import HomeView from '@/views/MainPageView.vue';
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
    component: UserProfile,
    meta: { requiresAuth: true },
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
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/components/CartPage.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/about',
    name: 'AboutUs',
    component: AboutUs,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (Cookies.get('Authorization')) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
