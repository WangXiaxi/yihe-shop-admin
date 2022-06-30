<template>
  <div class="home-container" v-loading="pageLoading">
    <div class="pub-title">后台统计</div>

    <el-row :gutter="10">
      <el-col
        v-for="(item, index) in todoList"
        :key="index"
        :xs="8"
        :sm="6"
        :md="6"
        :lg="4"
      >
        <div class="item">
          <i :class="item.icon"></i>
          <div class="box">
            <div class="num">{{ item.num }}</div>
            <div class="label">{{ item.label }}</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="pub-title" style="margin-top: 20px">最近待处理订单（{{ gridList.length }}条）</div>

    <el-table
      class="grid-table"
      stripe
      :data="gridList"
      :row-height="55"
      tooltip-effect="dark"
    >
      <el-table-column
        v-for="(item, index) in tableListText"
        :key="index"
        :prop="item.name"
        :label="item.text"
        :show-overflow-tooltip="true"
        :min-width="item.width"
        :width="item.realWidth"
      >
        <template slot-scope="{ row }">
          <span>{{ row[item.name] | fill }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="120">
        <template slot-scope="{ row }">
          <div class="grid-handle-list">
            <el-button
              icon="el-icon-view"
              type="text"
              @click="handleDetail(row)"
            >查看</el-button>
            <el-button
              icon="el-icon-edit"
              type="text"
              :loading="row.btnLoading"
              @click="handleEdit(row)"
            >编辑</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { list } from '@/api/home'
export default {
  components: {},
  data() {
    return {
      gridList: [],
      tableListText: [
        { name: 'order_no', text: '订单号', width: '120' },
        { name: 'accept_name', text: '收货人', width: '120' },
        { name: 'pay_status_text', text: '支付状态', width: '100' },
        { name: 'pname', text: '付款方式', realWidth: '100' },
        { name: 'dname', text: '发货方式', width: '100' },
        { name: 'username', text: '用户名', realWidth: '120' },
        { name: 'create_time', text: '下单时间', realWidth: '180' }
      ],
      todoList: [
        {
          label: '付款待发货',
          key: 'orderWaitCount',
          num: 0,
          icon: 'el-icon-s-cooperation'
        },
        {
          label: '待审提现',
          key: 'withdrawWaitCount',
          icon: 'el-icon-s-order',
          num: 0
        },
        {
          label: '退款申请',
          key: 'refundsCount',
          icon: 'el-icon-s-platform',

          num: 0
        },
        {
          label: '注册用户',
          key: 'getCountRegUser',
          icon: 'el-icon-user-solid',

          num: 0
        },
        {
          label: '商品数量',
          key: 'goodsCount',
          icon: 'el-icon-s-goods',

          num: 0
        },
        {
          label: '订单数量',
          key: 'getCountOrder',
          icon: 'el-icon-s-claim',

          num: 0
        },
        {
          label: '库存预警',
          key: 'goodsWarning',
          icon: 'el-icon-message-solid',
          num: 0
        }
      ],
      pageLoading: false
    }
  },
  computed: {},
  created() {
    this.getList()
  },
  mounted() {},
  activated() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await list()
      this.todoList.map((c) => {
        c.num = res[c.key] || 0
      })
      this.gridList = res.newOrderList
    },
    // 跳转
    goUrl(name, query) {
      this.$router.push({ name, query })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.home-container {
  padding: 10px;
  background: #fff;
}
.grid-table {
  margin-top: 10px;
}
.panel-title {
  position: relative;
  font-size: 16px;
  line-height: 30px;
  color: #0078d3;
  padding-left: 10px;
  &:before {
    content: ' ';
    width: 2px;
    background: #2b63b8;
    height: 18px;
    position: absolute;
    top: 6px;
    left: 0;
  }
}
.item {
  display: flex;
  align-items: center;
  margin: 10px 0 0 0;
  padding: 10px 15px 10px 20px;
  box-shadow: 4px 4px 40px rgb(0 0 0 / 5%);
  border-color: rgba(0, 0, 0, 0.05);
  text-align: right;
  .box {
    flex: 1;
  }
  i {
    font-size: 40px;
    color: #40c9c6;
  }
  .label {
    margin-top: 10px;
    color: #999;
    font-size: 14px;
  }
  .num {
    font-size: 20px;
  }
}
</style>
