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
      :model="form"
      :rules="rules"
      label-position="right"
      label-width="80px"
      ref="dataForm"
      v-loading="pageLoading"
    >
      <el-table class="grid-table" :data="form.products" style="width: 100%">
        <el-table-column label="商品名称" prop="name">
          <template slot-scope="{ row }">
            <div class="goods-td">
              <el-image
                class="goods-td-image"
                :src="row.img"
                fit="contain"
                :preview-src-list="[row.img]"
              ></el-image>
              <div class="goods-td-info">
                <div class="goods-td-name">{{ row.goodsName }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="实际价格" prop="real_price"></el-table-column>
        <el-table-column label="商品数量" prop="goods_nums"></el-table-column>
        <el-table-column type="selection" width="35"></el-table-column>
      </el-table>

      <el-form-item label="订单号">
        <span style="line-height: 32px">{{ detail.order_no | fill }}</span>
      </el-form-item>
      <el-form-item label="配送方式">
        <span style="line-height: 32px">{{ detail.create_time | fill }}</span>
      </el-form-item>
      <el-form-item label="配送费用">
        <span style="line-height: 32px">{{ detail.create_time | fill }}</span>
      </el-form-item>

      <el-form-item label="收件人姓名" prop="order_amount">
        <el-input v-model="form.note" clearable></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="order_amount">
        <el-input v-model="form.note" clearable></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="order_amount">
        <el-input v-model="form.note" clearable></el-input>
      </el-form-item>
      <el-form-item label="邮政编码" prop="order_amount">
        <el-input v-model="form.note" clearable></el-input>
      </el-form-item>

      <el-form-item label="快递物流公司" prop="order_amount">

        <el-select
          v-model="form.city"
          placeholder="请选择"
          filterable
        >
          <el-option
            v-for="(item, index) in freightOptions"
            :key="index"
            :label="item.label"
            :value="index"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="配送单号" prop="order_amount">
        <el-input v-model="form.note" clearable></el-input>
      </el-form-item>

      <el-form-item label="配送单号" prop="order_amount">
        <el-input v-model="form.note" clearable></el-input>
      </el-form-item>

      <div class="specs-box">
        <el-form-item label="收货地址">
          <el-select
            v-model="form.province"
            placeholder="请选择"
            filterable
            @change="provinceChange"
          >
            <el-option
              v-for="(item, index) in provinceOptions"
              :key="index"
              :label="item.label"
              :value="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" label-width="10px">
          <el-select
            v-model="form.city"
            placeholder="请选择"
            filterable
            @change="cityChange"
          >
            <el-option
              v-for="(item, index) in cityOptions"
              :key="index"
              :label="item.label"
              :value="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" label-width="10px">
          <el-select
            v-model="form.area"
            placeholder="请选择"
            filterable
            @change="areaChange"
          >
            <el-option
              v-for="(item, index) in areaOptions"
              :key="index"
              :label="item.label"
              :value="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>

      <el-form-item label="地址" prop="order_amount">
        <el-input v-model="form.note" clearable></el-input>
      </el-form-item>

      <el-form-item label="发货备注" prop="note">
        <el-input type="textarea" v-model="form.note" clearable></el-input>
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
import { updateUserOrder, getFreightCompany, getAreas } from '@/api/free-mall/order-list'

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
      form: cloneDeep(fields),

      rules: {
        order_amount: [
          { required: true, message: '请输入订单金额', trigger: 'blur' }
        ]
      },
      freightOptions: []
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
    async getAreas() {
      const adressObj = await getAreas()
      Object.assign(this.adressObj, adressObj)
      this.provinceOptions = this.adressObj.province
    },
    provinceChange(e) {
      this.cityOptions = this.adressObj.citys[e]
      this.form.city = ''
    },
    cityChange(e) {
      this.areaOptions = this.adressObj.areas[this.form.province][e]
      this.form.area = ''
    },
    areaChange(e) {},
    async getFreightCompany() {
      this.freightOptions = await getFreightCompany()
    },
    handleSure() {
      this.$refs.dataForm.validate((v) => {
        if (!v) return
        const { order_amount, note } = this.form
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
      this.form.order_amount = this.detail.order_amount
      this.getFreightCompany()
    },

    // 关闭窗口
    handleClose() {
      this.info.visible = false // 关闭
    },
    // 清楚数据
    cleared() {
      this.form = cloneDeep(fields)
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
