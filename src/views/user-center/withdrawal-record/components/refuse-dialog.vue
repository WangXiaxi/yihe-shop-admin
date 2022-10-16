<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="info.visible"
    append-to-body
    class="setting-dialog app-main"
    :title="`拒绝原因`"
    v-el-drag-dialog
    width="500px"
  >
    <el-form
      :model="temp"
      :rules="rules"
      label-position="right"
      label-width="0px"
      ref="dataForm"
    >

      <el-form-item label="" prop="note">
        <el-input type="textarea" placeholder="请输入拒绝原因" v-model="temp.note" clearable></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="handleClose">取 消</el-button>
      <el-button
        :loading="btnLoading"
        type="primary"
        @click.native="handleSure"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { cloneDeep } from 'lodash'
import {
  withdrawEditByID
} from '@/api/user-center/withdrawal-record.js'
const fields = {
  note: ''
}
export default {
  components: {},
  props: {
    info: {
      // 传入对象 方便父子组件传值
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      btnLoading: false,
      temp: cloneDeep(fields),

      rules: {
        note: [
          { required: true, message: '请输入拒绝原因', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'info.visible'(n) {
      // 用监听变化 来控制是获取数据还是清除 比用方法触发更加集中化
      if (n) {
        this.getdetail()
      } else {
        setTimeout(this.cleared, 300)
      }
    }
  },
  methods: {
    handleSure() {
      this.$refs.dataForm.validate((v) => {
        if (!v) return
        const { note } = this.temp
        const { id } = this.info.data
        const sendData = {
          id,
          re_note: note,
          status: -1
        }
        this.btnLoading = true
        withdrawEditByID(sendData)
          .then((res) => {
            this.btnLoading = false
            this.$message({
              showClose: true,
              message: `操作成功！`,
              type: 'success'
            })
            this.$emit('update', this.info.isEdit)
            this.handleClose()
          })
          .catch(() => {
            this.btnLoading = false
          })
      })
    },
    getdetail() {
    },

    // 关闭窗口
    handleClose() {
      this.info.visible = false // 关闭
    },
    // 清楚数据
    cleared() {
      this.temp = cloneDeep(fields)
      setTimeout(() => {
        this.$refs.dataForm.clearValidate()
      }, 50)
      this.btnLoading = false
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-form-item--small .el-form-item__content {
  line-height: 0;
}
</style>
