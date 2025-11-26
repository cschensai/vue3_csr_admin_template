<template>
  <aside 
    class="layout-sidebar"
    :class="{ 'is-collapsed': isCollapsed }"
  >
    <!-- Logo 和品牌名 -->
    <div class="sidebar-header flex items-center h-16 border-b border-gray-200 px-4">
      <div class="logo-wrapper flex items-center gap-2 w-full">
        <img 
          :src="logoSvg" 
          alt="logo" 
          class="w-8 h-8 flex-shrink-0"
        />
        <transition name="fade">
          <span 
            v-if="!isCollapsed"
            class="logo-text text-lg font-semibold text-gray-800 whitespace-nowrap"
          >
            FpAdmin
          </span>
        </transition>
      </div>
    </div>
    
    <div class="sidebar-content">
      <!-- 菜单项 -->
      <el-menu
        ellipsis
        :default-active="activeMenu"
        :collapse="isCollapsed"
        class="sidebar-menu"
        :class="{ 'is-collapsed-menu': isCollapsed }"
        router
      >
        <template v-for="route in menuRoutes" :key="route.path || route.name">
          <MenuItemIterator :route="route" />
        </template>
      </el-menu>
    </div>

    <!-- 底部折叠按钮 -->
    <div class="sidebar-footer">
      <el-icon 
        class="collapse-icon cursor-pointer"
        @click="toggleCollapse"
      >
        <!-- 自动引入图标组件 -->
        <i-ep-fold v-if="!isCollapsed" />
        <i-ep-expand v-else />
      </el-icon>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import logoSvg from '@/assets/svgs/logo.svg?url';
import { layoutRoutes } from '@/router/routeList';
import MenuItemIterator from './components/MenuItemIterator/index.vue';
import { filterHiddenRoutes } from './utils/getFilterMenu';
import type { CustomRouteRecordRaw } from '@/types/router';

const emit = defineEmits<{
  'collapse-change': [collapsed: boolean]
}>();

const route = useRoute();
const isCollapsed = ref<boolean>(false);

const activeMenu = computed<string>(() => route.path);

// 获取过滤后的菜单路由
const menuRoutes = computed<CustomRouteRecordRaw[]>(() => {
  // 遍历所有 layoutRoutes，收集所有 children 并合并
  const allChildren: CustomRouteRecordRaw[] = [];
  layoutRoutes.forEach(route => {
    if (route?.meta?.hidden) return;
    if (route.children && route.children.length > 0) {
      allChildren.push(...route.children);
    }
  });
  
  // 对合并后的 children 进行过滤
  if (allChildren.length > 0) {
    return filterHiddenRoutes(allChildren);
  }
  return [];
});

const toggleCollapse = (): void => {
  isCollapsed.value = !isCollapsed.value;
  emit('collapse-change', isCollapsed.value);
};

watch(isCollapsed, (val: boolean) => {
  emit('collapse-change', val);
}, { immediate: true });
</script>

<style lang="less" scoped>
.layout-sidebar {
  width: 200px;
  height: 100vh;
  border-right: 1px solid #e4e7ed;
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
  flex-shrink: 0;
  
  &.is-collapsed {
    width: 64px;
  }
}

.sidebar-header {
  flex-shrink: 0;
  background-color: #fff;
  
  .logo-wrapper {
    width: 100%;
    justify-content: flex-start;
    
    .logo-text {
      color: #303f5b;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.sidebar-menu {
  border-right: none;
  height: 100%;
  background: rgb(66, 84, 117);
}

.sidebar-footer {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #e4e7ed;
  background-color: #fff;
}

.collapse-icon {
  font-size: 20px;
  color: #606266;
  transition: color 0.3s;
  
  &:hover {
    color: #386bf3;
  }
}
.is-collapsed-menu {
  :deep(.el-sub-menu) {
    &.is-active {
      .el-sub-menu__title {
        color: #fff;
        background: #1a2638;
      }
    }
  }
}

</style>


