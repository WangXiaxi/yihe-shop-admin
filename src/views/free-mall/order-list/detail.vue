<template>
  <div class="detail-container" v-loading="pageLoading">
    <div class="detail-top-container">
      <div class="button-operation">
        <el-button
          :disabled="!btns.to_pay"
          type="primary"
          plain
          @click="handlePay"
        >支付</el-button>
        <el-button
          :disabled="!btns.to_deliver"
          type="primary"
          plain
          @click="handleSend"
        >发货</el-button>
        <el-button
          :disabled="!btns.to_refundment"
          type="primary"
          plain
          @click="handleReturn"
        >退款</el-button>
        <el-button
          :disabled="!btns.to_finish"
          type="primary"
          plain
          @click="handleFinish"
        >完成</el-button>
        <el-button
          :disabled="!btns.to_cancel"
          type="primary"
          plain
          @click="handleCancel"
        >作废</el-button>
      </div>

      <el-tabs v-model="activeName" v-loading="pageLoading">
        <el-tab-pane label="基本信息" name="first">
          <el-table
            class="grid-table"
            :data="detail.goods_data"
            style="width: 100%"
          >
            <el-table-column
              label="货号"
              prop="goodsno"
              :show-overflow-tooltip="true"
            ></el-table-column>

            <el-table-column label="商品名称" prop="name" min-width="300px">
              <template slot-scope="{ row }">
                <div class="goods-td">
                  <el-image
                    class="goods-td-image"
                    :src="row.img"
                    fit="contain"
                    :preview-src-list="[row.img]"
                  ></el-image>
                  <div class="goods-td-info">
                    <div class="goods-td-name">{{ row.name }}</div>
                  </div>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              label="商品原价"
              prop="goods_price"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              label="实际价格"
              prop="real_price"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              label="商品数量"
              prop="goods_nums"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              label="小计"
              prop="real_total"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              label="状态"
              prop="status_text"
              :show-overflow-tooltip="true"
            ></el-table-column>
          </el-table>

          <el-row :gutter="10" style="margin-top: 5px; padding-bottom: 5px">
            <el-col
              :span="12"
            ><div class="grid-content">
              <div class="title">订单金额明细</div>
              <div class="content">
                <div class="item">
                  <div class="item-label">商品总额:</div>
                  <div class="item-value">￥{{ detail.real_amount }}</div>
                </div>
                <div class="item">
                  <div class="item-label">实付运费:</div>
                  <div class="item-value">￥{{ detail.real_freight }}</div>
                </div>

                <div class="item">
                  <div class="item-label">税金:</div>
                  <div class="item-value">￥{{ detail.taxes }}</div>
                </div>
                <div class="item">
                  <div class="item-label">优惠总额:</div>
                  <div class="item-value">￥{{ detail.promotions }}</div>
                </div>
                <div class="item">
                  <div class="item-label">加价或减价:</div>
                  <div class="item-value">￥{{ detail.discount }}</div>
                </div>
                <div class="item">
                  <div class="item-label">订单总额:</div>
                  <div class="item-value">￥{{ detail.order_amount }}</div>
                </div>
              </div>
            </div></el-col>
            <el-col
              :span="12"
            ><div class="grid-content">
              <div class="title">订单信息</div>
              <div class="content">
                <div class="item">
                  <div class="item-label">订单号:</div>
                  <div class="item-value">{{ detail.order_no | fill }}</div>
                </div>
                <div class="item">
                  <div class="item-label">当前状态:</div>
                  <div class="item-value">
                    {{ detail.status_text | fill }}
                  </div>
                </div>
                <div class="item">
                  <div class="item-label">支付状态:</div>
                  <div class="item-value">
                    {{ detail.pay_status_text | fill }}
                  </div>
                </div>
                <div class="item">
                  <div class="item-label">配送状态:</div>
                  <div class="item-value">
                    {{ detail.distribution_status_text | fill }}
                  </div>
                </div>
                <div class="item">
                  <div class="item-label">订单类型:</div>
                  <div class="item-value">
                    {{ detail.order_type_text | fill }}
                  </div>
                </div>
                <div class="item">
                  <div class="item-label">订单附言:</div>
                  <div class="item-value">{{ detail.note | fill }}</div>
                </div>
              </div>
            </div>
            </el-col>
            <el-col
              :span="12"
            ><div class="grid-content">
              <div class="title">收件人信息</div>
              <div class="content">
                <div class="item">
                  <div class="item-label">发货日期:</div>
                  <div class="item-value">{{ detail.send_time | fill }}</div>
                </div>
                <div class="item">
                  <div class="item-label">姓名:</div>
                  <div class="item-value">
                    {{ detail.accept_name | fill }}
                  </div>
                </div>
                <div class="item">
                  <div class="item-label">手机:</div>
                  <div class="item-value">{{ detail.mobile | fill }}</div>
                </div>
                <div class="item">
                  <div class="item-label">电话:</div>
                  <div class="item-value">{{ detail.telphone | fill }}</div>
                </div>
                <div class="item">
                  <div class="item-label">地区:</div>
                  <div class="item-value" v-html="detail.area_addr"></div>
                </div>
                <div class="item">
                  <div class="item-label">地址:</div>
                  <div class="item-value">{{ detail.address | fill }}</div>
                </div>
                <div class="item">
                  <div class="item-label">邮编:</div>
                  <div class="item-value">{{ detail.postcode | fill }}</div>
                </div>
                <div class="item">
                  <div class="item-label">要求送货时间:</div>
                  <div class="item-value">
                    {{ detail.accept_time | fill }}
                  </div>
                </div>
                <div class="item">
                  <div class="item-label">送货时间:</div>
                  <div class="item-value">{{ detail.send_time | fill }}</div>
                </div>
              </div>
            </div></el-col>

            <el-col
              :span="12"
            ><div class="grid-content">
              <div class="title">配送支付信息</div>
              <div class="content">
                <div class="item">
                  <div class="item-label">配送方式:</div>
                  <div class="item-value">{{ detail.delivery | fill }}</div>
                </div>
                <div class="item">
                  <div class="item-label">商品重量:</div>
                  <div class="item-value">
                    {{ detail.goods_weight | fill }}
                  </div>
                </div>
                <div class="item">
                  <div class="item-label">支付方式:</div>
                  <div class="item-value">{{ detail.payment | fill }}</div>
                </div>
                <div class="item">
                  <div class="item-label">可得版通券:</div>
                  <div class="item-value">{{ detail.point | fill }}</div>
                </div>
                <!-- <div class="item">
                  <div class="item-label">可得经验:</div>
                  <div class="item-value">{{ detail.exp | fill }}</div>
                </div> -->
              </div>
            </div></el-col>

            <el-col
              :span="12"
              v-if="detail.invoice === '1'"
            ><div class="grid-content">
              <div class="title">发票信息</div>
              <div class="content">
                <div class="item">
                  <div class="item-label">公司名称:</div>
                  <div class="item-value">
                    {{ detail.invoice_info.company_name | fill }}
                  </div>
                </div>
                <div class="item">
                  <div class="item-label">纳税人识别码:</div>
                  <div class="item-value">
                    {{ detail.invoice_info.taxcode | fill }}
                  </div>
                </div>
                <div class="item">
                  <div class="item-label">注册地址:</div>
                  <div class="item-value">
                    {{ detail.invoice_info.address | fill }}
                  </div>
                </div>
                <div class="item">
                  <div class="item-label">注册电话:</div>
                  <div class="item-value">
                    {{ detail.invoice_info.telphone | fill }}
                  </div>
                </div>
                <div class="item">
                  <div class="item-label">开户银行:</div>
                  <div class="item-value">
                    {{ detail.invoice_info.bankname | fill }}
                  </div>
                </div>

                <div class="item">
                  <div class="item-label">银行账号:</div>
                  <div class="item-value">
                    {{ detail.invoice_info.bankno | fill }}
                  </div>
                </div>

                <div class="item">
                  <div class="item-label">发票类型:</div>
                  <div class="item-value">
                    {{
                      { 1: '普通发票', 2: '增值税专用票' }[
                        detail.invoice_info.type
                      ] | fill
                    }}
                  </div>
                </div>
              </div>
            </div></el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="发货记录" name="second">
          <el-table class="grid-table" :data="deList" style="width: 100%">
            <el-table-column label="配送时间" prop="name"></el-table-column>
            <el-table-column label="配送方式" prop="name"></el-table-column>
            <el-table-column label="物流公司" prop="name"></el-table-column>
            <el-table-column label="物流单号" prop="name"></el-table-column>
            <el-table-column label="收件人" prop="name"></el-table-column>
            <el-table-column label="备注" prop="name"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="订单日志" name="third">
          <el-table class="grid-table" :data="logList" style="width: 100%">
            <el-table-column
              min-width="120"
              label="时间"
              prop="addtime"
            ></el-table-column>
            <el-table-column
              min-width="80"
              label="操作人"
              prop="user"
            ></el-table-column>
            <el-table-column
              min-width="80"
              label="动作"
              prop="action"
            ></el-table-column>
            <el-table-column
              min-width="80"
              label="结果"
              prop="result"
            ></el-table-column>
            <el-table-column
              label="备注"
              prop="note"
              min-width="300px"
            ></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <pay-dialog
      :detail="detail"
      :info="payDialog"
      @update="getDetails"
    ></pay-dialog>
    <send-dialog
      :detail="detail"
      :info="sendDialog"
      @update="getDetails"
    ></send-dialog>
    <return-dialog
      :detail="detail"
      :info="returnDialog"
      @update="getDetails"
    ></return-dialog>
  </div>
</template>
<script>
import {
  getDetail,
  getDeliveryByOrderId,
  getOrderLogByID,
  updateUserOrder
} from '@/api/free-mall/order-list.js'
import PayDialog from './components/pay-dialog.vue'
import SendDialog from './components/send-dialog.vue'
import ReturnDialog from './components/return-dialog.vue'
export default {
  name: 'FreeMallOrderDetail',
  components: {
    PayDialog,
    SendDialog,
    ReturnDialog
  },
  data() {
    return {
      payDialog: {
        visible: false
      },
      sendDialog: {
        visible: false
      },
      returnDialog: {
        visible: false
      },
      detail: {
        goods_data: []
      },
      pageLoading: false,
      activeName: 'first',
      btns: {
        to_cancel: true,
        to_deliver: false,
        to_finish: false,
        to_pay: true,
        to_refundment: false
      },
      logList: [],
      deList: []
    }
  },
  created() {
    this.getDetails()
  },
  computed: {},
  methods: {
    handlePay() {
      Object.assign(this.payDialog, {
        visible: true
      })
    },
    handleSend() {
      Object.assign(this.sendDialog, {
        visible: true
      })
    },
    handleCancel() {
      this.$confirm('确定作废当前订单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.btnLoading = true
          const sendData = {
            editType: 'complete',
            type: 4,
            id: this.detail.id,
            order_no: this.detail.order_no
          }
          updateUserOrder(sendData)
            .then((res) => {
              this.btnLoading = false
              this.$message.success('作废操作成功！')
              this.getDetails()
            })
            .catch(() => {
              this.btnLoading = false
            })
        })
        .catch(() => {})
    },
    handleReturn() {
      Object.assign(this.returnDialog, {
        visible: true
      })
    },
    handleFinish() {
      this.$confirm('确定完成当前订单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.btnLoading = true
          const sendData = {
            editType: 'complete',
            type: 5,
            id: this.detail.id,
            order_no: this.detail.order_no
          }
          updateUserOrder(sendData)
            .then((res) => {
              this.btnLoading = false
              this.$message.success('完成操作成功！')
              this.getDetails()
            })
            .catch(() => {
              this.btnLoading = false
            })
        })
        .catch(() => {})
    },
    async getDetails() {
      const id = this.$route.params.id
      this.pageLoading = true
      const res = await getDetail({ id })
      const res1 = await getDeliveryByOrderId({ order_id: id })
      const res2 = await getOrderLogByID({ order_id: id })
      res.goods_data.map((c) => {
        c.goods_array = JSON.parse(c.goods_array)
        Object.assign(c, c.goods_array, {
          real_total: (Number(c.real_price) * Number(c.goods_nums)).toFixed(2)
        })
      })
      res.invoice_info = res.invoice === '1' ? JSON.parse(res.invoice_info) : {}
      this.logList = res2
      this.deList = res1
      this.pageLoading = false
      this.detail = res
      Object.assign(this.btns, res.btns)
    }
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