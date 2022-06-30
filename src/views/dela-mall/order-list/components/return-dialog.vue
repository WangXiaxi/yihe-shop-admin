<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="info.visible"
    append-to-body
    class="setting-dialog app-main"
    :title="`退款`"
    v-el-drag-dialog
    width="600px"
  >
    <el-form
      :model="temp"
      :rules="rules"
      label-position="right"
      label-width="120px"
      ref="dataForm"
      v-loading="pageLoading"
    >
      <el-form-item label="订单号" style="margin: -10px 0 10px 0;">
        <span style="line-height: 32px">{{ detail.order_no | fill }}</span>
      </el-form-item>
      <el-form-item label="下单时间" style="margin: 10px 0;">
        <span style="line-height: 32px">{{ detail.create_time | fill }}</span>
      </el-form-item>
      <el-form-item label="商品应付金额" style="margin: 10px 0;">
        <span style="line-height: 32px">{{
          detail.payable_amount | fill
        }}</span>
      </el-form-item>
      <el-form-item label="商品实付金额" style="margin: 10px 0;">
        <span style="line-height: 32px">{{ detail.real_amount | fill }}</span>
      </el-form-item>
      <el-form-item label="运费应付金额" style="margin: 10px 0;">
        <span style="line-height: 32px">{{
          detail.payable_freight | fill
        }}</span>
      </el-form-item>
      <el-form-item label="运费实付金额" style="margin: 10px 0;">
        <span style="line-height: 32px">{{ detail.real_freight | fill }}</span>
      </el-form-item>
      <el-form-item label="税金" style="margin: 10px 0;">
        <span style="line-height: 32px">{{ detail.taxes | fill }}</span>
      </el-form-item>
      <el-form-item label="加价或减价" style="margin: 10px 0;">
        <span style="line-height: 32px">{{ detail.discount | fill }}</span>
      </el-form-item>
      <el-form-item label="订单总额" style="margin: 10px 0;">
        <span style="line-height: 32px">{{ detail.order_amount | fill }}</span>
      </el-form-item>

      <el-form-item label="退款金额流向" prop="way">
        <el-select v-model="temp.way" placeholder="请选择" filterable>
          <el-option
            v-for="(item, index) in wayOptions"
            :key="index"
            :label="item.label"
            :value="item.key"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <div class="item-box">
        <el-form-item label="退款金额" prop="param1">
          <el-select v-model="temp.param1" placeholder="请选择" filterable>
            <el-option
              v-for="(item, index) in param1Options"
              :key="index"
              :label="item.label"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="temp.param1 === '1'" label="" label-width="10px" prop="amount">
          <input-cleave
            placeholder="请输入自定义金额"
            :is-decimal="2"
            v-model="temp.amount"
            clearable
          ></input-cleave>
        </el-form-item>
      </div>
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
  way: 'balance',
  param1: '0'
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
      temp: cloneDeep(fields),
      wayOptions: [{ key: 'balance', label: '余额' }],
      param1Options: [
        { key: '0', label: '自动计算[默认]' },
        { key: '1', label: '自定义金额' }
      ],
      rules: {
        amount: [{ required: true, message: '请输入', trigger: 'blur' }]
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
        const { amount, way, param1 } = this.temp
        const { id, order_no, user_id, order_amount, goods_data } = this.detail
        const refunds_nums = []
        const order_goods_id = []
        goods_data.map(c => {
          refunds_nums.push(c.goods_nums)
          order_goods_id.push(c.id)
        })
        const sendData = {
          id,
          order_no,
          user_id,
          way,
          refunds_nums,
          order_goods_id,
          amount: param1 === '0' ? order_amount : amount,
          editType: 'refundment'
        }
        this.btnLoading = true
        updateUserOrder(sendData)
          .then((res) => {
            this.btnLoading = false
            this.$message({
              showClose: true,
              message: `退款操作成功！`,
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
.item-box,
.specs-box {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .el-form-item {
    width: 50%;
  }
  .el-select {
    width: 100%;
  }
}
</style>
