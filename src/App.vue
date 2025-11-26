<template>
  <div class="app-box">
    <router-view v-slot="{ Component }">
      <transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
// store 已定义但未使用，保留以备将来使用
// import { useStoreIndex } from '@/store/index';
// const store = useStoreIndex();
</script>

<style lang="less" scoped>

</style>
