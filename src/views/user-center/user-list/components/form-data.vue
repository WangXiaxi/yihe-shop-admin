<template>
  <div class="detail-container">
    <div class="detail-top-container">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基础信息" name="baseInfo">
          <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="form.name" clearable></el-input>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {

}
</script>
