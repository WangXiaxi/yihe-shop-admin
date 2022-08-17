<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="info.visible"
    append-to-body
    class="setting-dialog app-main"
    :title="`操作会员`"
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
      <el-form-item label="身份" prop="param1">
        <el-select v-model="temp.param1" placeholder="请选择" filterable style="width: 100%;">
          <el-option
            v-for="(item, index) in param1Options"
            :key="index"
            :label="item"
            :value="index"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资格" prop="param2">
        <el-select v-model="temp.param2" placeholder="请选择" filterable style="width: 100%;">
          <el-option
            v-for="(item, index) in param2Options"
            :key="index"
            :label="item"
            :value="index"
          >
          </el-option>
        </el-select>
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
  getSystemVipInfo,
  editSystemVipUser
} from '@/api/user-center/user-list.js'
const fields = {
  param1: '',
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
      param1Options: [],
      param2Options: [],
      temp: cloneDeep(fields),
      rules: {
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
        const { param1, param2 } = this.temp
        const { user_id } = this.info.data
        const sendData = {
            user_id,
          data: [{
            fields: 'is_agent',
            value: param1
          },
          {
            fields: 'agent_level',
            value: param2
          }]
        }
        this.btnLoading = true
        editSystemVipUser(sendData)
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
    async getdetail() {
      const res = await getSystemVipInfo()
      this.param1Options = res.is_agent
      this.param2Options = res.agent_level
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
