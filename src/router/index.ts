import { createRouter, createWebHistory } from 'vue-router';
import type { Router } from 'vue-router';
import routeList from './routeList';
import NProgress from '@/utils/nprogress';

const router: Router = createRouter({
  // 设置baseUrl，为了适配nginx上的处理
  // history: createWebHistory('/template'),
  history: createWebHistory(),
  strict: false, // 严格模式，当路由不匹配时，会抛出错误
  routes: routeList as any,
});

// 跳转前
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

// 跳转后
router.afterEach(() => {
  NProgress.done();
});

export default router;

