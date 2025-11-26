<template>
  <el-dialog
    v-model="visible"
    :width="600"
    :show-close="false"
    :close-on-click-modal="true"
    :close-on-press-escape="true"
    class="search-dialog"
    @close="handleClose"
  >
    <template #header>
      <div class="search-header">
        <el-input
          ref="searchInputRef"
          v-model="searchKeyword"
          placeholder="搜索菜单 (支持标题、拼音、拼音首字母搜索)"
          class="search-input"
          clearable
          @input="handleSearch"
          @keydown.enter="handleEnter"
          @keydown.esc="handleClose"
        >
          <template #prefix>
            <el-icon class="search-icon"><Search /></el-icon>
          </template>
        </el-input>
      </div>
    </template>
    
    <div class="search-content">
      <!-- 搜索结果列表 -->
      <div v-if="searchResults.length > 0" class="search-results">
        <div
          v-for="(item, index) in searchResults"
          :key="index"
          class="search-result-item"
          @click="handleItemClick(item)"
        >
          <div class="result-content">
            <el-icon v-if="item.icon" class="result-icon">
              <component :is="getIcon(item.icon)" />
            </el-icon>
            <div class="result-text">
              <div class="result-title">{{ item.title }}</div>
              <div class="result-path">{{ item.path }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-else-if="searchKeyword" class="empty-state">
        <div class="empty-illustration">
          <EmptyDataSvg />
        </div>
        <div class="empty-text">暂无搜索结果</div>
      </div>
      
      <!-- 初始状态 -->
      <div v-else class="empty-state">
        <div class="empty-illustration">
          <EmptyDataSvg />
        </div>
        <div class="empty-text">请输入关键词搜索菜单</div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Search } from '@element-plus/icons-vue';
import * as ElementIcons from '@element-plus/icons-vue';
import { searchMenu } from '../../utils/searchMenu';
import { layoutRoutes } from '@/router/routeList';
import EmptyDataSvg from '@/assets/svgs/emptyData.svg?component';
import type { MenuItem } from '@/types/menu';
import type { InputInstance } from 'element-plus';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>();

const router = useRouter();
const searchInputRef = ref<InputInstance | null>(null);
const searchKeyword = ref<string>('');
const searchResults = ref<MenuItem[]>([]);

const visible = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val),
});

// 监听弹窗显示，自动聚焦输入框
watch(visible, (newVal: boolean) => {
  if (newVal) {
    nextTick(() => {
      searchInputRef.value?.focus();
      searchKeyword.value = '';
      searchResults.value = [];
    });
  }
});

// 搜索处理
const handleSearch = (): void => {
  const keyword = searchKeyword.value.trim();
  if (!keyword) {
    searchResults.value = [];
    return;
  }
  
  // 执行搜索
  const results = searchMenu(layoutRoutes, keyword);
  searchResults.value = results;
};

// 点击搜索结果项
const handleItemClick = (item: MenuItem): void => {
  if (item.path) {
    router.push(item.path);
    handleClose();
  }
};

// 回车键处理
const handleEnter = (): void => {
  if (searchResults.value.length > 0) {
    handleItemClick(searchResults.value[0]);
  }
};

// 获取图标组件
const getIcon = (iconName: string): any => {
  return (ElementIcons as Record<string, any>)[iconName];
};

// 关闭弹窗
const handleClose = (): void => {
  visible.value = false;
  searchKeyword.value = '';
  searchResults.value = [];
};
</script>

<style lang="less" scoped>
.search-dialog {
  :deep(.el-dialog__header) {
    padding: 20px 20px 16px;
    border-bottom: 1px solid #f0f0f0;
  }
  
  :deep(.el-dialog__body) {
    padding: 0;
  }
}

.search-header {
  width: 100%;
}

.search-input {
  :deep(.el-input__wrapper) {
    border-radius: 8px;
    box-shadow: 0 0 0 1px #409eff inset;
    
    &:hover {
      box-shadow: 0 0 0 1px #409eff inset;
    }
    
    &.is-focus {
      box-shadow: 0 0 0 1px #409eff inset;
    }
  }
  
  :deep(.el-input__inner) {
    font-size: 14px;
    padding-left: 12px;
  }
}

.search-icon {
  font-size: 18px;
  color: #909399;
}

.search-content {
  min-height: 300px;
  max-height: 500px;
  overflow-y: auto;
}

.search-results {
  padding: 8px 0;
}

.search-result-item {
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f5f7fa;
  }
  
  &:active {
    background-color: #ebedf0;
  }
}

.result-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.result-icon {
  font-size: 18px;
  color: #606266;
  flex-shrink: 0;
}

.result-text {
  flex: 1;
  min-width: 0;
}

.result-title {
  font-size: 14px;
  color: #303133;
  font-weight: 500;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.result-path {
  font-size: 12px;
  color: #909399;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  min-height: 300px;
}

.empty-illustration {
  margin-bottom: 16px;
  opacity: 0.6;
}

.empty-text {
  font-size: 14px;
  color: #909399;
}
</style>

