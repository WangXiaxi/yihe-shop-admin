<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="配送方式" prop="param1">
      <el-select
        class="w-400"
        v-model="form.distribution"
        placeholder="请选择配送方式"
        filterable
        clearable
      >
        <el-option
          v-for="item in distributionOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="配送运费" prop="real_freight">

      <input-cleave
        class="w-400"

        :is-decimal="2"
        v-model="form.real_freight"
        clearable
      ></input-cleave>
    </el-form-item>
    <el-form-item label="支付方式" prop="pay_type">
      <el-select
        class="w-400"

        v-model="form.pay_type"
        placeholder="请选择支付方式"
        filterable
        clearable
      >
        <el-option
          v-for="item in pay_typeOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="是否需要发票" prop="invoice">
      <el-select
        class="w-400"

        v-model="form.invoice"
        placeholder="请选择"
        filterable
      >
        <el-option
          v-for="item in invoiceOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <div v-if="form.invoice === '1'">
      <el-form-item label="公司名称" prop="invoice_company_name">
        <el-input class="w-400" v-model="form.invoice_company_name" clearable></el-input>
      </el-form-item>
      <el-form-item label="纳税人识别码" prop="invoice_taxcode">
        <el-input class="w-400" v-model="form.invoice_taxcode" clearable></el-input>
      </el-form-item>
      <el-form-item label="注册地址" prop="invoice_address">
        <el-input class="w-400" v-model="form.invoice_address" clearable></el-input>
      </el-form-item>
      <el-form-item label="注册电话" prop="invoice_telphone">
        <el-input class="w-400" v-model="form.invoice_telphone" clearable></el-input>
      </el-form-item>
      <el-form-item label="开户银行" prop="invoice_bankname">
        <el-input class="w-400" v-model="form.invoice_bankname" clearable></el-input>
      </el-form-item>
      <el-form-item label="银行账号" prop="invoice_bankno">
        <el-input class="w-400" v-model="form.invoice_bankno" clearable></el-input>
      </el-form-item>

      <el-form-item label="发票类型" prop="invoice_type">
        <el-select
          class="w-400"

          v-model="form.invoice_type"
          placeholder="请选择"
          filterable
        >
          <el-option
            v-for="item in invoice_typeOptions"
            :key="item.key"
            :label="item.label"
            :value="item.key"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </div>
    <el-form-item label="订单备注" prop="note">
      <el-input type="textarea" class="w-400" v-model="form.note" clearable></el-input>
    </el-form-item>

    <el-form-item label="指定送货时间" prop="accept_time">
      <el-select
        class="w-400"

        v-model="form.accept_time"
        placeholder="请选择"
        filterable
      >
        <el-option
          v-for="item in accept_timeOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        >
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>

</template>

<script>
export default {
   props: {
    form: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {
  },
  computed: {

  },
  data() {
    return {
      distributionOptions: [
        { label: '快递', key: '1' },
        { label: '货到货款', key: '2' }
      ],
      pay_typeOptions: [
        { label: '预存款', key: '1' },
        { label: '微信小程序支付', key: '17' }
      ],
      invoiceOptions: [
        { label: '否', key: '0' },
         { label: '是', key: '1' }
      ],
      invoice_typeOptions: [
          { label: '普通发票', key: '1' },
         { label: '增值税专用票', key: '2' }
      ],
      accept_timeOptions: [
          { label: '任意', key: '任意' },
          { label: '周一到周五', key: '周一到周五' },
          { label: '周末', key: '周末' }

      ],
      rules: {}
    }
  },
  methods: {
   validate(callback) {
      this.$refs.form.validate(callback)
    }
  }
}
</script>
<style lang="scss" scoped>
.w-400 {
  width:400px;
}
</style>