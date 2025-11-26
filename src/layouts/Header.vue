<template>
  <header class="layout-header flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
    <!-- 左侧面包屑 -->
    <div class="header-left flex items-center gap-4 flex-1">
      <!-- 面包屑导航 -->
      <div class="breadcrumb-container flex-1">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item 
            v-for="(item, index) in breadcrumbList" 
            :key="index"
            :to="item.path"
          >
            {{ item.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <!-- 右侧操作区 -->
    <div class="header-right flex items-center gap-4">
      <!-- 搜索图标 -->
      <el-icon class="header-icon cursor-pointer" @click="handleSearch">
        <i-ep-search />
      </el-icon>
      
      <!-- 全屏图标 -->
      <el-icon class="header-icon cursor-pointer" @click="handleFullscreen">
        <i-ep-fullScreen />
      </el-icon>
      <!-- 通知图标 -->
      <NotifyDropdown>
        <el-badge :value="notificationCount" :hidden="notificationCount === 0" class="notification-badge relative top-0.5">
          <el-icon class="header-icon cursor-pointer">
            <i-ep-bell />
          </el-icon>
        </el-badge>
      </NotifyDropdown>
      
      <!-- 用户菜单 -->
      <el-dropdown @command="handleUserCommand" trigger="click">
        <div class="user-menu flex items-center gap-2 cursor-pointer">
          <el-avatar :size="32" class="user-avatar">
            <el-icon><i-ep-user /></el-icon>
          </el-avatar>
          <span class="username text-sm text-gray-700">common</span>
          <el-icon class="dropdown-icon" :size="14"><i-ep-arrow-down /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    
    <!-- 搜索弹窗 -->
    <SearchDialog v-model="searchDialogVisible" />
  </header>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import Cookies from 'js-cookie';
import SearchDialog from './components/SearchDialog/index.vue';
import NotifyDropdown from './components/NotifyDropdown/index.vue';

interface BreadcrumbItem {
  title: string;
  path: string;
}

const router = useRouter();
const route = useRoute();
const notificationCount = ref<number>(8);
const searchDialogVisible = ref<boolean>(false);

// 面包屑数据
const breadcrumbList = computed<BreadcrumbItem[]>(() => {
  const matched = route.matched.filter(item => item.meta && item.meta.title);
  if (matched.length === 0) {
    // 如果没有配置 meta，默认显示当前路由名称或路径
    return [{
      title: (route.name as string) || '首页',
      path: route.path
    }];
  }
  return matched.map(item => ({
    title: item.meta.title as string,
    path: item.path
  }));
});

const handleSearch = (): void => {
  searchDialogVisible.value = true;
};

const handleFullscreen = (): void => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

const handleUserCommand = (command: string): void => {
  if(command === 'logout') {
    Cookies.remove('token');
    router.push('/login');
    ElMessage.success('已退出登录');
  }
};
</script>

<style lang="less" scoped>
.layout-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.breadcrumb-container {
  min-width: 0; // 允许 flex 子元素收缩
  
  :deep(.el-breadcrumb) {
    font-size: 14px;
    line-height: 1.5;
    
    .el-breadcrumb__inner {
      color: #909399;
      font-weight: 400;
      
      &.is-link {
        color: #606266;
        
        &:hover {
          color: #386bf3;
        }
      }
    }
    
    .el-breadcrumb__separator {
      color: #c0c4cc;
      margin: 0 8px;
    }
  }
}

.header-icon {
  font-size: 20px;
  color: #606266;
  transition: color 0.3s;
  
  &:hover {
    color: #386bf3;
  }
}

.notification-badge {
  :deep(.el-badge__content) {
    background-color: #f56c6c;
  }
}

.user-menu {
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #f5f7fa;
  }
}

.user-avatar {
  background-color: #386bf3;
  
  :deep(.el-icon) {
    color: #fff;
  }
}

.username {
  color: #303f5b;
}

.dropdown-icon {
  font-size: 12px;
  color: #909399;
}
</style>

