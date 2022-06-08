<template>
  <div class="detail-container">
    <div class="detail-top-container">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基础信息" name="baseInfo">
          <el-form style="width: 500px;" ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="form.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="name">
              <el-input v-model="form.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="name">
              <el-input v-model="form.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="name">
              <el-input v-model="form.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="name">
              <el-input v-model="form.name" clearable></el-input>
            </el-form-item>

            <div class="specs-box">
              <el-form-item label="地区">
                <el-select
                  v-model="form.param1"
                  placeholder="请选择省份"
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
                  placeholder="请选择市"
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
                  placeholder="请选择区"
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

            <el-form-item label="地址" prop="name">
              <el-input v-model="form.name" clearable></el-input>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div class="detail-btn-container">
      <el-button type="primary">保存</el-button>
      <el-button type="primary" plain>关闭</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ['baseInfo'],
      form: {

      },
      rules: {}
    }
  }
}
</script>

<style lang="scss" scoped>

.specs-box {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}
::v-deep .el-collapse-item__wrap {
  border: none;
}

</style>
