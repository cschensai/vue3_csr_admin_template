import type { CustomRouteRecordRaw } from '@/types/router';

// 递归过滤路由，过滤掉 hidden: true 的选项
export const filterHiddenRoutes = (routes: CustomRouteRecordRaw[]): CustomRouteRecordRaw[] => {
  if (!routes || !Array.isArray(routes)) {
    return [];
  }
  return routes
    .filter(route => {
      // 如果当前路由的 hidden 为 true，则过滤掉（包括其子项）
      return !route.meta?.hidden;
    })
    .map(route => {
      // 创建新对象，避免修改原对象
      const filteredRoute: CustomRouteRecordRaw = { ...route };
      delete filteredRoute.component;
      
      // 如果有子路由，递归处理
      if (route.children && route.children.length > 0) {
        const filteredChildren = filterHiddenRoutes(route.children);
        // 如果过滤后的子路由不为空，才设置 children
        if (filteredChildren.length > 0) {
          filteredRoute.children = filteredChildren;
        } else {
          // 如果过滤后没有子路由，删除 children 属性
          delete filteredRoute.children;
        }
      }
      
      return filteredRoute;
    });
};

