<template>
  <el-dialog
    :close-on-click-modal="false"
    v-el-drag-dialog
    :title="textMap"
    width="1000px"
    class="setting-dialog"
    :visible.sync="info.visible"
  >
    <auth-info v-if="info.visible" :info="info" ref="authInfo"></auth-info>
    <div slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        :loading="loading"
        @click.native="handleSave"
      >保存</el-button>
      <el-button @click.native="handleClose">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { edit } from '@/api/menu-manage/roles-list'
import { cloneDeep } from 'lodash'
import AuthInfo from './auth-info'
export default {
  components: {
    AuthInfo
  },
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: false,
      textMap: '分配菜单权限'
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
      this.loading = true
      const rights = this.$refs.authInfo.selectRowData.map(c => c.id)
      const sendData = cloneDeep(this.info.data)
      sendData.rights = rights.join(',')
      edit(sendData)
        .then(() => {
          this.$message.success('保存成功！')
          this.handleClose()
          this.$emit('update', this.info.isEdit)
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .setting-dialog {
    ::v-deep .el-dialog__body {
      padding: 10px 20px;
    }
  }
</style>