import type { RouteRecordRaw } from 'vue-router';

export interface RouteMeta {
  title?: string;
  icon?: string;
  hidden?: boolean;
}

export interface CustomRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children'> {
  meta?: RouteMeta;
  children?: CustomRouteRecordRaw[];
}

// 类型断言辅助函数
export function asRouteRecordRaw(route: CustomRouteRecordRaw): RouteRecordRaw {
  return route as unknown as RouteRecordRaw;
}

