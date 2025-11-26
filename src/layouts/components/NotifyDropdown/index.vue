<template>
  <el-dropdown trigger="click" :hide-on-click="false">
    <slot></slot>
    <template #dropdown>
      <div class="w-80 p-2">
        <el-tabs v-model="activeName" class="w-full" stretch @tab-click="handleClick">
          <el-tab-pane label="通知" name="notify" class="text-center">
            <EmptyDataSvg />
            <div class="text-center">暂无通知</div>
          </el-tab-pane>
          <el-tab-pane label="消息" name="msg" class="text-center">
            <EmptyDataSvg />
            <div class="text-center">暂无消息</div>
          </el-tab-pane>
          <el-tab-pane label="待办" name="todo" class="text-center">
            <EmptyDataSvg />
            <div class="text-center">暂无待办</div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import EmptyDataSvg from '@/assets/svgs/emptyData.svg?component';
import type { TabsPaneContext } from 'element-plus';

const activeName = ref<string>('notify');

const handleClick = (tab: TabsPaneContext, event: Event): void => {
  console.log(tab, event);
};
</script>
