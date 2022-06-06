<template>
  <div class="detail-container">
    <div class="detail-top-container">
      <div class="button-operation">
        <el-button type="primary" plain @click="handleAdd">支付</el-button>
        <el-button type="primary" plain @click="handleAdd">发货</el-button>
        <el-button type="primary" plain @click="handleAdd">退款</el-button>
        <el-button type="primary" plain @click="handleAdd">完成</el-button>
        <el-button type="primary" plain @click="handleAdd">作废</el-button>
      </div>

      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <el-table
            class="grid-table"
            :data="[{ name: '23455' }]"
            style="width: 100%"
          >
            <el-table-column label="商品名称" prop="name" min-width="300px">
              <template slot-scope="{ row }">
                <div class="goods-td">
                  <el-image
                    class="goods-td-image"
                    :src="row.src"
                    fit="contain"
                  ></el-image>
                  <div class="goods-td-info">
                    <div class="goods-td-name">{{ row.name }}</div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="商品原价" prop="name"></el-table-column>
            <el-table-column label="实际价格" prop="name"></el-table-column>
            <el-table-column label="商品数量" prop="name"></el-table-column>
            <el-table-column label="小计" prop="name"></el-table-column>
            <el-table-column label="状态" prop="name"></el-table-column>
          </el-table>

          <el-row :gutter="10" style="margin-top: 5px; padding-bottom: 5px">
            <el-col
              :span="12"
            ><div class="grid-content">
              <div class="title">订单金额明细</div>
              <div class="content">
                <div class="item">
                  <div class="item-label">商品总额:</div>
                  <div class="item-value">￥558.00</div>
                </div>
                <div class="item">
                  <div class="item-label">商品总额:</div>
                  <div class="item-value">￥558.00</div>
                </div>
                <div class="item">
                  <div class="item-label">商品总额:</div>
                  <div class="item-value">￥558.00</div>
                </div>
                <div class="item">
                  <div class="item-label">商品总额:</div>
                  <div class="item-value">￥558.00</div>
                </div>
                <div class="item">
                  <div class="item-label">商品总额:</div>
                  <div class="item-value">￥558.00</div>
                </div>
              </div>
            </div></el-col>

            <el-col
              :span="12"
            ><div class="grid-content">
              <div class="title">订单金额明细</div>
              <div class="content">
                <div class="item">
                  <div class="item-label">商品总额:</div>
                  <div class="item-value">￥558.00</div>
                </div>
                <div class="item">
                  <div class="item-label">商品总额:</div>
                  <div class="item-value">￥558.00</div>
                </div>
                <div class="item">
                  <div class="item-label">商品总额:</div>
                  <div class="item-value">￥558.00</div>
                </div>
                <div class="item">
                  <div class="item-label">商品总额:</div>
                  <div class="item-value">￥558.00</div>
                </div>
                <div class="item">
                  <div class="item-label">商品总额:</div>
                  <div class="item-value">￥558.00</div>
                </div>
              </div>
            </div></el-col>

            <el-col
              :span="12"
            ><div class="grid-content">
              <div class="title">订单金额明细</div>
              <div class="content">
                <div class="item">
                  <div class="item-label">商品总额:</div>
                  <div class="item-value">￥558.00</div>
                </div>
                <div class="item">
                  <div class="item-label">商品总额:</div>
                  <div class="item-value">￥558.00</div>
                </div>
                <div class="item">
                  <div class="item-label">商品总额:</div>
                  <div class="item-value">￥558.00</div>
                </div>
                <div class="item">
                  <div class="item-label">商品总额:</div>
                  <div class="item-value">￥558.00</div>
                </div>
                <div class="item">
                  <div class="item-label">商品总额:</div>
                  <div class="item-value">￥558.00</div>
                </div>
              </div>
            </div></el-col>

            <el-col
              :span="12"
            ><div class="grid-content">
              <div class="title">订单金额明细</div>
              <div class="content">
                <div class="item">
                  <div class="item-label">商品总额:</div>
                  <div class="item-value">￥558.00</div>
                </div>
                <div class="item">
                  <div class="item-label">商品总额:</div>
                  <div class="item-value">￥558.00</div>
                </div>
                <div class="item">
                  <div class="item-label">商品总额:</div>
                  <div class="item-value">￥558.00</div>
                </div>
                <div class="item">
                  <div class="item-label">商品总额:</div>
                  <div class="item-value">￥558.00</div>
                </div>
                <div class="item">
                  <div class="item-label">商品总额:</div>
                  <div class="item-value">￥558.00</div>
                </div>
              </div>
            </div></el-col>

            <el-col
              :span="12"
            ><div class="grid-content">
              <div class="title">订单金额明细</div>
              <div class="content">
                <div class="item">
                  <div class="item-label">商品总额:</div>
                  <div class="item-value">￥558.00</div>
                </div>
                <div class="item">
                  <div class="item-label">商品总额:</div>
                  <div class="item-value">￥558.00</div>
                </div>
                <div class="item">
                  <div class="item-label">商品总额:</div>
                  <div class="item-value">￥558.00</div>
                </div>
                <div class="item">
                  <div class="item-label">商品总额:</div>
                  <div class="item-value">￥558.00</div>
                </div>
                <div class="item">
                  <div class="item-label">商品总额:</div>
                  <div class="item-value">￥558.00</div>
                </div>
              </div>
            </div></el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="发货记录" name="second">
          <el-table
            class="grid-table"
            :data="[{ name: '23455' }]"
            style="width: 100%"
          >
            <el-table-column label="配送时间" prop="name"></el-table-column>
            <el-table-column label="配送方式" prop="name"></el-table-column>
            <el-table-column label="物流公司" prop="name"></el-table-column>
            <el-table-column label="物流单号" prop="name"></el-table-column>
            <el-table-column label="收件人" prop="name"></el-table-column>
            <el-table-column label="备注" prop="name"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="订单日志" name="third">
          <el-table
            class="grid-table"
            :data="[{ name: '23455' }]"
            style="width: 100%"
          >
            <el-table-column label="时间" prop="name"></el-table-column>
            <el-table-column label="操作人" prop="name"></el-table-column>
            <el-table-column label="动作" prop="name"></el-table-column>
            <el-table-column label="结果" prop="name"></el-table-column>
            <el-table-column
              label="备注"
              prop="name"
              min-width="300px"
            ></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FreeMallOrderDetail',
  components: {},
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
  computed: {},
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
.button-operation {
  margin-top: 10px;
}

.grid-content {
  border: 1px solid #00a65a;
  border-radius: 3px;
  margin: 5px 0;
  .title {
    display: block;
    padding: 10px;
    position: relative;
    font-size: 14px;
    color: #fff;
    background: #00a65a;
    background-color: #00a65a;
  }
  .content {
    padding: 10px 10px;

    .item {
      display: flex;
      align-items: flex-start;
      padding: 5px 0;
      & + .item {
        border-top: 1px solid #efefef;
      }
      .item-label {
        width: 90px;
        text-align: right;
        line-height: 32px;
        font-size: 14px;
        color: #333;
      }
      .item-value {
        margin-left: 10px;
        line-height: 32px;
        font-size: 14px;

        color: #999;
      }
    }
  }
}
</style>