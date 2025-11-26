<template>
  <div class="layout-container flex h-screen">
    <!-- 左侧 Sidebar -->
    <LayoutSidebar @collapse-change="handleCollapseChange" />
    
    <!-- 右侧内容区 -->
    <div class="layout-right flex flex-col flex-1 overflow-hidden">
      <!-- 顶部 Header -->
      <LayoutHeader />
      
      <!-- 主内容区 -->
      <main class="layout-main flex-1 flex flex-col overflow-hidden">
        <div class="main-content flex-1 flex flex-col overflow-auto">
          <div class="flex-1 bg-white p-2">
            <router-view v-slot="{ Component }">
              <transition name="page-fade" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </div>
      </main>
      
      <!-- 底部 Footer -->
      <LayoutFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import LayoutHeader from './Header.vue';
import LayoutSidebar from './Sidebar.vue';
import LayoutFooter from './Footer.vue';

const isSidebarCollapsed = ref<boolean>(false);

const handleCollapseChange = (collapsed: boolean): void => {
  isSidebarCollapsed.value = collapsed;
};
</script>

<style lang="less" scoped>
.layout-container {
  background-color: #f5f7fa;
  width: 100%;
  height: 100vh;
}

.layout-right {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.layout-main {
  background-color: #fff;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.main-content {
  background-color: #e5e3e3;
  padding: 8px;
  flex: 1;
  overflow-y: auto;
}
</style>

