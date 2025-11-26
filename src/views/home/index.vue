<template>
  <div class="home-page">
    <!-- 数据表格 -->
    <DataTable />
    <DataTable />
    <DataTable />
    <DataTable />
    <DataTable />
    <DataTable />
    <DataTable />
    <DataTable />
  </div>
</template>

<script setup lang="ts">
import DataTable from './components/DataTable.vue';
</script>

<style lang="less" scoped>
.home-page {
  width: 100%;
}
</style>
