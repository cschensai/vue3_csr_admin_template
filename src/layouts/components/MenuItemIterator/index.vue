<template>
  <el-sub-menu 
    v-if="route.children && route.children.length > 0"
    :index="route.path"
    class="sub-menu"
  >
    <template #title>
      <el-icon v-if="route.meta?.icon">
        <component :is="getIcon(route.meta.icon)" />
      </el-icon>
      <span>{{ route.meta?.title || route.name }}</span>
    </template>
    <MenuItemIterator 
      v-for="child in route.children" 
      :key="child.path || child.name"
      :route="child"
    />
  </el-sub-menu>
  
  <el-menu-item 
    v-else
    :index="route.path"
    class="menu-item"
  >
    <el-icon v-if="route.meta?.icon">
      <component :is="getIcon(route.meta.icon)" />
    </el-icon>
    <template #title>{{ route.meta?.title || route.name }}</template>
  </el-menu-item>
</template>

<script setup lang="ts">
import * as ElementIcons from '@element-plus/icons-vue';
import type { CustomRouteRecordRaw } from '@/types/router';

// name是递归的重点
defineOptions({
  name: 'MenuItemIterator'
});

defineProps<{
  route: CustomRouteRecordRaw;
}>();

// 获取图标组件
const getIcon = (iconName: string): any => {
  return (ElementIcons as Record<string, any>)[iconName];
};
</script>

<style lang="less" scoped>
.sub-menu {
  :deep(.el-menu-item) {
    color: #fff;
    background: rgb(66, 84, 117);
    height: 48px;
    line-height: 48px;
    
    &.is-active {
      background-color: #1a2638;
      color: #fff;
    }
    
    &:hover {
      background-color: #344359;
    }
  }
  :deep(.el-sub-menu__title) {
    color: #fff;
    background: rgb(66, 84, 117);
    height: 48px;
    line-height: 48px;
    
    &:hover {
      background-color: #344359;
    }
  }
  
  :deep(.el-sub-menu .el-menu-item) {
    padding-left: 50px !important;
  }
}
.menu-item {
  height: 48px;
  color: #fff;
  background: rgb(66, 84, 117);
  &.is-active {
    background-color: #1a2638;
    color: #fff;
  }
  &:hover {
    background-color: #344359;
  }
}
</style>

