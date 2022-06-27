<template>
  <div class="detail-container">
    <div class="detail-top-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="商品信息" name="first">
          <goods-list ref="form-goods" :form="form"></goods-list>
        </el-tab-pane>
        <el-tab-pane label="订单配置" name="second">
          <order-setting ref="form-setting" :form="form"></order-setting>
        </el-tab-pane>
        <el-tab-pane
          label="收货人信息"
          name="third"
        ><user-info ref="form-user" :form="form"></user-info></el-tab-pane>
      </el-tabs>
    </div>
    <div class="detail-btn-container">
      <el-button
        type="primary"
        :loading="btnLoading"
        @click="handleSure"
      >保存</el-button>
      <el-button type="primary" @click="handleClose" plain>关闭</el-button>
    </div>
  </div>
</template>
<script>
import GoodsList from './goods-list.vue'
import OrderSetting from './order-setting.vue'
import UserInfo from './user-info.vue'
import { editUserOrder, getDetail } from '@/api/free-mall/order-list.js'

export default {
  components: {
    GoodsList,
    OrderSetting,
    UserInfo
  },
  props: {
    isEdit: {
      type: [Boolean, Number],
      default: 0
    }
  },
  data() {
    return {
      btnLoading: false,
      form: {
        distribution: '1', // 1: 快递 2: 货到付款
        real_freight: '', // 运费
        pay_type: '', // 支付方式
        invoice: '0', // 是否需要发票
        invoice_company_name: '', // 开票公司名称
        invoice_taxcode: '', // 纳税识别号
        invoice_address: '', // 注册地址
        invoice_telphone: '', // 注册电话
        invoice_bankname: '', // 开户银行
        invoice_bankno: '', // 银行账号
        invoice_type: '1', // 发票类型 1 普通发票 2 增值税专用票
        note: '', // 备注信息
        accept_time: '任意', // 指定送货时间

        username: '', // 用户名
        accept_name: '', // 收货人姓名
        province: '', //
        city: '',
        area: '',
        address: '', // 收货地址
        mobile: '',
        telphone: '', // 手机号
        postcode: '', // 邮箱
        postscript: '', // 用户留言

        products: []
      },
      activeName: 'first'
    }
  },
  created() {
    if (this.isEdit) {
      this.getDetails()
    }
  },
  computed: {
    previewList() {
      return this.form.images.map((c) => c.url)
    }
  },
  methods: {
    async getDetails() {
      this.pageLoading = true
      const id = this.$route.params.id
      const res = await getDetail({ id })
    },
    validate(callback) {
      const refs = this.$refs
      const formList = []
      for (const i in refs) {
        let realValid = true
        if (refs[i] && i.indexOf('form-') > -1) {
          // 特殊标记ref
          refs[i].validate((valid) => {
            realValid = valid
            formList.push(valid)
          })
          if (!realValid) {
            return callback(false)
          }
        }
      }
      callback(formList.indexOf(false) === -1)
    },
    handleSure() {
      this.validate((v) => {
        if (!v) return
        const { provinceOptions, cityOptions, areaOptions } =
          this.$refs['form-user']
        const { products, city, area, province, ...other } = this.form
        const goods_id = []
        const product_id = []
        const goods_nums = []
        products.map((c) => {
          goods_id.push(c.goods_id)
          product_id.push(c.product_id)
          goods_nums.push(c.num)
        })
        const sendData = {
          ...other,
          province: province || province === 0 ? provinceOptions[province].value : '',
          area: area || area === 0 ? areaOptions[area].value : '',
          city: city || city === 0 ? cityOptions[city].value : '',
          goods_id,
          product_id,
          goods_nums
        }

        this.btnLoading = true
        editUserOrder(sendData)
          .then((res) => {
            this.btnLoading = false
            this.$message.success(`${this.isEdit ? '编辑' : '新增'}商品成功！`)
            this.handleClose(true)
          })
          .catch(() => {
            this.btnLoading = false
          })
      })
    },
    handleClose(refresh = false) {
      this.$tab.closeOpenPage({ name: 'FreeMallOrder' })
      if (refresh) {
        this.$bus.emit('FreeMallOrderUpdate')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-form-item--small .el-form-item__content {
  line-height: 0;
  .el-radio-group {
    display: flex;
    align-items: center;
    height: 32px;
  }
}
.detail-container {
  position: relative;
  height: calc(100vh - 84px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f7f7f7;
  .detail-top-container {
    position: relative;
    flex: 1;
    width: 100%;
    padding: 0 20px;
    height: 0;
    background: #ffffff;
    overflow: auto;
  }
  .detail-btn-container {
    position: relative;
    height: 50px;
    width: 100%;
    margin-top: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
  }
}

.form-table ::v-deep {
  .has-gutter {
    th {
      height: 32px;
      padding: 0;
    }
  }
  .el-form-item--small.el-form-item {
    margin-bottom: 0;
  }
}
</style>