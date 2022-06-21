<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="配送方式" prop="param1">
      <el-select
        class="w-400"
        v-model="form.param1"
        placeholder="请选择配送方式"
        filterable
        clearable
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
    <el-form-item label="配送运费" prop="name">
      <el-input class="w-400" v-model="form.name" clearable></el-input>
    </el-form-item>
    <el-form-item label="支付方式" prop="param3">
      <el-select
        class="w-400"

        v-model="form.param3"
        placeholder="请选择支付方式"
        filterable
        clearable
      >
        <el-option
          v-for="item in param3Options"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="订单备注" prop="name">
      <el-input type="textarea" class="w-400" v-model="form.name" clearable></el-input>
    </el-form-item>
  </el-form>

</template>

<script>
export default {
  components: {
  },
  computed: {

  },
  data() {
    return {
      form: {

      },
      param1Options: [],
      param3Options: [],
      rules: {}
    }
  },
  methods: {
    validate() {

    }
  }
}
</script>
<style lang="scss" scoped>
.w-400 {
  width:400px;
}
</style>