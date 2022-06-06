<template>
  <div class="detail-container">
    <div class="detail-top-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="商品信息" name="first">
          <goods-list></goods-list>
        </el-tab-pane>
        <el-tab-pane label="订单配置" name="second">
          <order-setting></order-setting>
        </el-tab-pane>
        <el-tab-pane
          label="收货人信息"
          name="third"
        ><user-info></user-info></el-tab-pane>
      </el-tabs>
    </div>
    <div class="detail-btn-container">
      <el-button type="primary">保存</el-button>
      <el-button type="primary" plain>关闭</el-button>
    </div>
  </div>
</template>
<script>
import GoodsList from './goods-list.vue'
import OrderSetting from './order-setting.vue'
import UserInfo from './user-info.vue'
export default {
  components: {
    GoodsList,
    OrderSetting,
    UserInfo
  },
  data() {
    return {
      form: {},
      rules: {
        name1: []
      },
      activeName: 'first'
    }
  },
  created() {},
  computed: {
    previewList() {
      return this.form.images.map((c) => c.url)
    }
  },
  methods: {
    getDetails() {}
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