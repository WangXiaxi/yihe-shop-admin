<template>
  <el-dialog
    :close-on-click-modal="false"
    v-el-drag-dialog
    :title="textMap"
    width="500px"
    class="setting-dialog"
    :visible.sync="info.visible"
  >
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="loading" @click.native="handleSave">保存</el-button>
      <el-button @click.native="handleClose">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {
    getRefundmentOrderDetail
  } from '@/api/user-center/re-bill-list'

  const fields = {
  }
  export default {
    components: {},
    props: {
      info: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        loading: false,
        textMap: '详情',
        temp: JSON.parse(JSON.stringify(fields))
      }
    },
    watch: {
      'info.visible'(n) {
        if (n) {
          this.getDetails()
        } else {
          setTimeout(this.cleared, 300)
        }
      }
    },
    created() {},
    mounted() {},
    methods: {
      handleClose() {
        // 关闭
        this.info.visible = false
      },
      handleSave() {
        // 保存
        this.$refs.dataForm.validate((r) => {
        })
      },
      async getDetails() {
        const { order_id: id, id: refunds_id } = this.info.data
        const res = await getRefundmentOrderDetail({ id, refunds_id })
      },
      cleared() {
      }
    }
  }

</script>

<style lang="scss" scoped>
</style>
