<template>
  <footer class="layout-footer h-12 flex items-center justify-center bg-gray-50 border-t border-gray-200">
    <span class="footer-text text-sm text-gray-500">
      Copyright © {{ currentYear}}-powered by FP_DESIGN
    </span>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<style lang="less" scoped>
.layout-footer {
  flex-shrink: 0;
  z-index: 100;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
}
</style>

