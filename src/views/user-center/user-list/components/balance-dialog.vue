<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="info.visible"
    append-to-body
    class="setting-dialog app-main"
    :title="`余额操作`"
    v-el-drag-dialog
    width="400px"
  >
    <el-form
      :model="temp"
      :rules="rules"
      label-position="right"
      label-width="80px"
      ref="dataForm"
      v-loading="pageLoading"
    >
      <el-form-item label="操作类型" prop="param1">
        <el-select
          v-model="temp.param1"
          placeholder="请选择"
          filterable
          style="width: 100%"
        >
          <el-option
            v-for="item in param1Options"
            :key="item.key"
            :label="item.label"
            :value="item.key"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作金额" prop="param2">
        <input-cleave
          v-model="temp.param2"
          placeholder="请输入金额"
          :is-decimal="2"
        ></input-cleave>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="handleClose">取 消</el-button>
      <el-button
:loading="btnLoading"
type="primary"
@click.native="handleSure"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { cloneDeep } from 'lodash'

import { updateUserBalance } from '@/api/user-center/user-list.js'
const fields = {
  param1: 'recharge',
  param2: ''
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
      pageLoading: false,
      btnLoading: false,
      param1Options: [
        {
          key: 'recharge',
          label: '增加'
        },
        {
          key: 'withdraw',
          label: '减少'
        }
      ],
      temp: cloneDeep(fields),
      rules: {}
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
        const { param1, param2 } = this.temp
        const { user_id } = this.info.data
        const sendData = {
          ids: [user_id],
          type: param1,
          balance: param2
        }
        this.btnLoading = true
        updateUserBalance(sendData)
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
    async getdetail() {},

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
