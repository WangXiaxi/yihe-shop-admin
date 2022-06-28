<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="info.visible"
    append-to-body
    class="setting-dialog app-main"
    :title="`支付`"
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
      <el-form-item label="订单号" prop="goodsNos">
        <span style="line-height: 32px">{{ detail.order_no | fill }}</span>
      </el-form-item>
      <el-form-item label="下单时间" prop="goodsNos">
        <span style="line-height: 32px">{{ detail.create_time | fill }}</span>
      </el-form-item>
      <el-form-item label="是否开票" prop="goodsNos">
        <span style="line-height: 32px">{{
          detail.invoice === '1' ? '是' : '否'
        }}</span>
      </el-form-item>
      <el-form-item label="税金" prop="goodsNos">
        <span style="line-height: 32px">{{ detail.taxes | fill }}</span>
      </el-form-item>
      <el-form-item label="发票信息" prop="goodsNos">
        <span style="line-height: 32px">{{ detail.invoice_info | fill }}</span>
      </el-form-item>
      <el-form-item label="订单金额" prop="order_amount">
        <input-cleave
          :is-decimal="2"
          v-model="temp.order_amount"
          clearable
        ></input-cleave>
      </el-form-item>
      <el-form-item label="收款备注" prop="note">
        <el-input type="textarea" v-model="temp.note" clearable></el-input>
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
import { updateUserOrder } from '@/api/free-mall/order-list'

const fields = {
  order_amount: '',
  note: ''
}
export default {
  components: {},
  props: {
    info: {
      // 传入对象 方便父子组件传值
      type: Object,
      default: () => ({})
    },
    detail: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      pageLoading: false,
      btnLoading: false,
      goodsNos: '',
      temp: cloneDeep(fields),

      rules: {
        order_amount: [
          { required: true, message: '请输入订单金额', trigger: 'blur' }
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
        const { order_amount, note } = this.temp
        const { id, order_no } = this.detail
        const sendData = {
          id,
          order_no,
          amount: order_amount,
          note,
          editType: 'collection'
        }
        this.btnLoading = true
        updateUserOrder(sendData)
          .then((res) => {
            this.btnLoading = false
            this.$message({
              showClose: true,
              message: `支付成功！`,
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
      this.temp.order_amount = this.detail.order_amount
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
