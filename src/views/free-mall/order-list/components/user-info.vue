<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="所属用户名" prop="username">
      <el-input class="w-400" v-model="form.username" clearable></el-input>
      <p class="tip">
        订单所属于的用户，直接填写用户名，订单创建后与该用户绑定在一起，如果为空则为游客订单或者线下订单
      </p>
    </el-form-item>
    <el-form-item label="收件人姓名" prop="accept_name">
      <el-input class="w-400" v-model="form.accept_name" clearable></el-input>
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

    <el-form-item label="收货地址" prop="address">
      <el-input class="w-400" v-model="form.address" clearable></el-input>
    </el-form-item>

    <el-form-item label="联系手机" prop="mobile">
      <el-input class="w-400" v-model="form.mobile" clearable></el-input>
    </el-form-item>

    <el-form-item label="联系电话" prop="telphone">
      <el-input class="w-400" v-model="form.telphone" clearable></el-input>
    </el-form-item>

    <el-form-item label="邮编" prop="postcode">
      <el-input class="w-400" v-model="form.postcode" clearable></el-input>
    </el-form-item>

    <el-form-item label="用户附言" prop="postscript">
      <el-input
        type="textarea"
        class="w-400"
        v-model="form.postscript"
        clearable
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { getAreas } from '@/api/free-mall/order-list'

export default {
  props: {
    form: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {},
  computed: {},
  data() {
    return {
      provinceOptions: [],
      cityOptions: [],
      areaOptions: [],
      rules: {},
      adressObj: {}
    }
  },
  created() {
    this.getAreas()
  },
  methods: {
    validate(callback) {
      this.$refs.form.validate(callback)
    },
    async getAreas() {
      const adressObj = await getAreas()
      this.provinceOptions = adressObj.province
      this.adressObj = adressObj
    },
    provinceChange(e) {
      this.cityOptions = this.adressObj.citys[e]
      this.form.city = ''
    },
    cityChange(e) {
      this.areaOptions = this.adressObj.areas[this.form.province][e]
      this.form.area = ''
    },
    areaChange(e) {
    }
  }
}
</script>
<style lang="scss" scoped>
.w-400 {
  width: 400px;
}
.tip {
  color: #999;
  font-size: 13px;
}
.specs-box {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}
</style>