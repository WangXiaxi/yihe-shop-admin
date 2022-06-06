<template>
  <el-pagination
    :current-page="page"
    :page-size="limit"
    :total="total"
    :page-sizes="pageSizes"
    background
    layout="total, sizes, prev, pager, next, jumper"
    style="margin: 10px 0 0 0;"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script>
export default {
  name: 'AdminPagination',
  props: {
    page: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    pageSizes: {
      default: () => [20, 30, 50, 500, 1000],
      type: Array
    }
  },
  methods: {
    // 分页数量改变
    handleSizeChange(val) {
      this.$emit('change', {
        pageIndex: this.page,
        pageSize: val
      })
    },
    // 页码改变
    handleCurrentChange(val) {
      this.$emit('change', {
        pageIndex: val,
        pageSize: this.limit
      })
    }
  }
}
</script>
