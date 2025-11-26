import Layout from '@/layouts/index.vue';
import type { CustomRouteRecordRaw } from '@/types/router';

const noLoginRoutes: CustomRouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import('../views/login/index.vue'),
  },
];

// 路由信息
/**
 * 标准路由结构
 * {
      path: "/home",
      name: "Home",
      component:  () => import('../views/home/index.vue'),
      meta: {
          title: '首页',
          icon: 'House',
          hidden: true/false
      }
    }
 */

const layoutRoutes: CustomRouteRecordRaw[] = [
  {
    path: "/", // required 字段
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import('../views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'House'
        }
      },
      {
        path: "/error",
        name: "ErrorPage",
        meta: {
          title: '异常页面',
          icon: 'Warning'
        },
        redirect: "/error/403",
        children: [
          {
            path: "/error/403",
            name: "403",
            component: () => import('../components/404/index.vue'),
            meta: {
              title: '403',
            }
          },
          {
            path: "/error/404",
            name: "404",
            meta: {
              title: '404',
            },
            redirect: "/error/404/405",
            children: [
              {
                path: "/error/404/405",
                name: "405",
                component: () => import('../components/404/index.vue'),
                meta: {
                  title: '405',
                }
              },
            ],
          }
        ]
      },
    ]
  },
];

const notFoundRoutes: CustomRouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('../components/404/index.vue'),
  },
];

export default [...noLoginRoutes, ...layoutRoutes, ...notFoundRoutes];
export { layoutRoutes };

