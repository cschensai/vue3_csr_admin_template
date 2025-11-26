import { pinyin } from 'pinyin-pro';
import { filterHiddenRoutes } from './getFilterMenu';
import type { CustomRouteRecordRaw } from '@/types/router';
import type { MenuItem } from '@/types/menu';

/**
 * 将菜单项扁平化，并生成搜索关键词
 * @param routes 路由数组
 * @returns 扁平化的菜单项数组
 */
const flattenMenuItems = (routes: CustomRouteRecordRaw[]): MenuItem[] => {
  let result: MenuItem[] = [];
  
  if (!routes || !Array.isArray(routes)) {
    return result;
  }
  
  routes.forEach(route => {
    // 跳过hidden为true的菜单
    if (route.meta?.hidden) {
      return;
    }
    
    const routeName = typeof route.name === 'string' ? route.name : '';
    const title = route.meta?.title || routeName || '';
    const path = route.path;
    
    // 生成搜索关键词：标题、拼音、拼音首字母
    const keywords: string[] = [];
    if (title) {
      keywords.push(title);
      // 生成拼音（pinyin-pro 默认返回不带声调的拼音字符串）
      const pinyinStr = pinyin(title, { toneType: 'none' }).replace(/\s+/g, '');
      keywords.push(pinyinStr);
      
      // 生成拼音首字母
      const firstLetter = pinyin(title, { pattern: 'first' }).replace(/\s+/g, '');
      keywords.push(firstLetter);
    }
    
    // 创建菜单项
    const menuItem: MenuItem = {
      title,
      path: path, // 路由的path已经是完整路径
      keywords: keywords.join(' ').toLowerCase(), // 为搜索使用的字段
      icon: route.meta?.icon,
    };
    
    result.push(menuItem);
    
    // 递归处理子菜单
    if (route.children && route.children.length > 0) {
      const childItems = flattenMenuItems(route.children);
      result = result.concat(childItems);
    }
  });
  
  return result;
};

/**
 * 搜索菜单
 * @param layoutRoutes 布局路由数组
 * @param keyword 搜索关键词
 * @returns 匹配的菜单项数组
 */
export const searchMenu = (layoutRoutes: CustomRouteRecordRaw[], keyword: string): MenuItem[] => {
  if (!keyword || !keyword.trim()) {
    return [];
  }
  
  // layoutRoutes的结构是：[{ path: "/", component: Layout, children: [...] }]
  // 我们需要提取children中的路由进行搜索
  const menuRoutes: CustomRouteRecordRaw[] = [];
  layoutRoutes.forEach(route => {
    if (route.children && route.children.length > 0) {
      menuRoutes.push(...route.children);
    }
  });
  
  // 先过滤掉hidden的菜单
  const filteredRoutes = filterHiddenRoutes(menuRoutes);
  
  // 扁平化菜单项
  const flatMenuItems = flattenMenuItems(filteredRoutes);
  
  // 将搜索关键词转为小写
  const searchKeyword = keyword.toLowerCase().trim();
  
  // 模糊匹配
  const matchedItems = flatMenuItems.filter(item => {
    return item.keywords.includes(searchKeyword);
  });
  
  return matchedItems;
};

