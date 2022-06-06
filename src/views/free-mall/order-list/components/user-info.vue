<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="所属用户名" prop="param1">
      <el-input class="w-400" v-model="form.name" clearable></el-input>
      <p class="tip">
        订单所属于的用户，直接填写用户名，订单创建后与该用户绑定在一起，如果为空则为游客订单或者线下订单
      </p>
    </el-form-item>
    <el-form-item label="收货地区" prop="param1">
      <el-input class="w-400" v-model="form.name" clearable></el-input>
    </el-form-item>

    <div class="specs-box">
      <el-form-item label="收货地址">
        <el-select
          v-model="form.param1"
          placeholder="请选择"
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
      <el-form-item label="" label-width="10px">
        <el-select
          v-model="form.param1"
          placeholder="请选择"
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
      <el-form-item label="" label-width="10px">
        <el-select
          v-model="form.param1"
          placeholder="请选择"
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
    </div>

    <el-form-item label="收货地址" prop="param1">
      <el-input class="w-400" v-model="form.name" clearable></el-input>
    </el-form-item>

    <el-form-item label="联系手机" prop="param1">
      <el-input class="w-400" v-model="form.name" clearable></el-input>
    </el-form-item>

    <el-form-item label="联系电话" prop="param1">
      <el-input class="w-400" v-model="form.name" clearable></el-input>
    </el-form-item>

    <el-form-item label="邮编" prop="param1">
      <el-input class="w-400" v-model="form.name" clearable></el-input>
    </el-form-item>

    <el-form-item label="用户附言" prop="name">
      <el-input
        type="textarea"
        class="w-400"
        v-model="form.name"
        clearable
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  components: {},
  computed() {},
  data() {
    return {
      form: {},
      param1Options: [],
      param3Options: [],
      rules: {}
    }
  },
  methods: {
    validate() {}
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