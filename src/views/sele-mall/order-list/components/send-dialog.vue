<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="info.visible"
    append-to-body
    class="setting-dialog app-main"
    :title="`发货`"
    v-el-drag-dialog
    width="1000px"
  >
    <el-form
      :model="form"
      :rules="rules"
      label-position="right"
      label-width="120px"
      ref="dataForm"
      v-loading="pageLoading"
    >
      <el-table class="grid-table" :data="form.products" style="width: 100%">
        <el-table-column
          label="商品货号"
          prop="goodsno"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="商品名称"
          prop="name"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          label="实际价格"
          prop="real_price"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="商品数量"
          prop="goods_nums"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column width="85">
          <template slot-scope="{ row }">
            <span v-if="row.status_text !== '未发货'">{{
              row.status_text
            }}</span>
            <el-checkbox v-else v-model="row.check"></el-checkbox>
          </template>
        </el-table-column>
      </el-table>

      <div class="item-box" style="margin-top: 10px">
        <el-form-item label="订单号">
          <span style="line-height: 32px">{{ detail.order_no | fill }}</span>
        </el-form-item>
        <el-form-item label="配送方式">
          <span style="line-height: 32px">{{ detail.create_time | fill }}</span>
        </el-form-item>
      </div>
      <div class="item-box" style="margin-top: -10px">
        <el-form-item label="配送费用">
          <span style="line-height: 32px">{{
            detail.real_freight | fill
          }}</span>
        </el-form-item>
      </div>
      <div class="item-box" style="margin-top: -5px">
        <el-form-item label="收件人姓名" prop="name">
          <el-input v-model="form.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="telphone">
          <el-input v-model="form.telphone" clearable></el-input>
        </el-form-item>
      </div>
      <div class="item-box">
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="form.mobile" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" prop="postcode">
          <el-input v-model="form.postcode" clearable></el-input>
        </el-form-item>
      </div>
      <div class="item-box">
        <el-form-item label="快递物流公司" prop="freight_id">
          <el-select v-model="form.freight_id" placeholder="请选择" filterable>
            <el-option
              v-for="(item, index) in freightOptions"
              :key="index"
              :label="item.freight_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="配送单号" prop="delivery_code">
          <el-input v-model="form.delivery_code" clearable></el-input>
        </el-form-item>
      </div>

      <div class="specs-box">
        <el-form-item label="收货地址" prop="province" style="flex: 4">
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
        <el-form-item label="" prop="city" label-width="10px" style="flex: 3">
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
        <el-form-item label="" prop="area" label-width="10px" style="flex: 3">
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

      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address" clearable></el-input>
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
import {
  updateUserOrder,
  getFreightCompany,
  getAreas
} from '@/api/free-mall/order-list'

const fields = {
  products: [],
  name: '',
  user_id: '',
  freight: '',
  delivery_type: '',
  telphone: '',
  mobile: '',
  postcode: '',
  freight_id: '',
  delivery_code: '',
  province: '',
  city: '',
  area: '',
  address: '',
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
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        postcode: [
          { required: true, message: '请输入邮政编码', trigger: 'blur' }
        ],
        freight_id: [
          { required: true, message: '请选择物流公司', trigger: 'change' }
        ],
        delivery_code: [
          { required: true, message: '请输入配送单号', trigger: 'blur' }
        ],
        province: [
          { required: true, message: '请选择省份', trigger: 'change' }
        ],
        city: [{ required: true, message: '请选择城市', trigger: 'change' }],
        area: [{ required: true, message: '请选择地区', trigger: 'change' }],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }]
      },
      provinceOptions: [],
      cityOptions: [],
      areaOptions: [],
      freightOptions: [],
      adressObj: {}
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
        const {
          name,
          user_id,
          freight,
          delivery_type,
          telphone,
          mobile,
          postcode,
          freight_id,
          delivery_code,
          province,
          city,
          area,
          address,
          note,
          products
        } = this.form
        const { id, order_no } = this.detail
        const { provinceOptions, areaOptions, cityOptions } = this

        const sendgoods = products
          .filter((c) => c.check)
          .map((c) => c.id)
        if (sendgoods.length === 0) {
          return this.$message.error('请选择商品！')
        }
        const sendData = {
          id,
          order_no,
          name,
          user_id,
          freight,
          delivery_type,
          telphone,
          mobile,
          postcode,
          freight_id,
          delivery_code,
          province: province || province === 0 ? provinceOptions[province].value : '',
          area: area || area === 0 ? areaOptions[area].value : '',
          city: city || city === 0 ? cityOptions[city].value : '',
          address,
          note,
          sendgoods,
          editType: 'delivery'
        }
        this.btnLoading = true
        updateUserOrder(sendData)
          .then((res) => {
            this.btnLoading = false
            this.$message({
              showClose: true,
              message: `发货成功！`,
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
      const {
        goods_data,
        accept_name,
        user_id,
        distributin,
        real_freight,
        telphone,
        mobile,
        postcode,
        province: provinceCode,
        city: cityCode,
        area: areaCode,
        address,
        note
      } = this.detail
      this.form.products = cloneDeep(goods_data).map((c) => {
        c.check = false
        return c
      })
      console.log(this.form.products)
      this.pageLoading = true
      await this.getFreightCompany()
      await this.getAreas()
      this.pageLoading = false

      const province = provinceCode
        ? this.adressObj.province.findIndex((c) => c.value === provinceCode)
        : ''
      this.form.province = province
      if (provinceCode) {
        this.provinceChange(province)
      }
      const city =
        provinceCode && cityCode
          ? this.adressObj.citys[province].findIndex(
              (c) => c.value === cityCode
            )
          : ''
      this.form.city = city
      if (cityCode) {
        this.cityChange(city)
      }
      const area =
        provinceCode && cityCode && areaCode
          ? this.adressObj.areas[province][city].findIndex(
              (c) => c.value === areaCode
            )
          : ''

      Object.assign(this.form, {
        name: accept_name,
        user_id: user_id,
        freight: real_freight,
        delivery_type: distributin,
        telphone,
        mobile,
        postcode,
        freight_id: '',
        delivery_code: '',
        province,
        city,
        area,
        address,
        note
      })
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
.el-table ::v-deep th.el-table__cell > .cell {
  padding-left: 14px;
  padding-right: 14px;
}
</style>
