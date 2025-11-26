<template>
  <div class="data-table-wrapper">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      class="data-table"
    >
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
    
    <!-- 浮动操作按钮 -->
    <el-backtop :right="40" :bottom="40" />
  </div>
</template>

<script setup lang="ts">
interface TableDataItem {
  date: string;
  name: string;
  address: string;
}

const tableData = ref<TableDataItem[]>([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]);
</script>

<style lang="less" scoped>
.data-table-wrapper {
  background-color: #fff;
  border-radius: 4px;
  
  :deep(.el-table) {
    .el-table__header {
      th {
        background-color: #fafafa;
        color: #606266;
        font-weight: 500;
      }
    }
    
    .el-table__body {
      tr {
        &:hover {
          background-color: #f5f7fa;
        }
      }
    }
  }
}
</style>

