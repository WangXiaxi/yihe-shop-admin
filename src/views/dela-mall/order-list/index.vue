<template>
  <div class="grid-table">
    <div class="grid-body" flex="dir:top">
      <div class="search">
        <div class="search-form-item">
          <el-select
            class="inp select-types"
            style="width: 110px"
            v-model="listQuery.type"
            placeholder="请选择"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            >
            </el-option>
          </el-select>
          <el-input
            class="inp inp-types"
            v-model="listQuery.content"
            :placeholder="`请输入${
              typeOptions.find((c) => c.key === listQuery.type).label
            }`"
            clearable
          />
        </div>
        <div class="search-form-item">
          <el-select
            class="inp"
            style="width: 170px"
            v-model="listQuery.status"
            placeholder="请选择订单状态"
            filterable
            clearable
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </div>
        <div class="search-form-item">
          <el-select
            class="inp"
            style="width: 170px"
            v-model="listQuery.distribution_status"
            placeholder="请选择发货状态"
            filterable
            clearable
          >
            <el-option
              v-for="item in distribution_statusOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </div>
        <div class="search-form-item" v-if="isSpread">
          <el-select
            class="inp"
            style="width: 170px"
            v-model="listQuery.pay_status"
            placeholder="请选择支付状态"
            filterable
            clearable
          >
            <el-option
              v-for="item in pay_statusOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </div>

        <div class="search-form-item" v-if="isSpread">
          <el-input
            style="width: 120px"
            class="inp"
            v-model="listQuery.order_amount_down"
            placeholder="订单总额下限"
            clearable
          />
        </div>

        <div class="search-form-item" v-if="isSpread">
          <el-input
            style="width: 120px"
            class="inp"
            v-model="listQuery.order_amount_up"
            placeholder="订单总额上限"
            clearable
          />
        </div>

        <div class="search-form-item" v-if="isSpread">
          <el-date-picker
            v-model="listQuery.create_time"
            class="inp"
            style="width: auto"
            type="datetimerange"
            range-separator="至"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="订单生成开始时间"
            end-placeholder="订单生成结束时间"
            :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </div>

        <div class="search-form-item" v-if="isSpread">
          <el-date-picker
            v-model="listQuery.send_time"
            class="inp"
            style="width: auto"
            type="datetimerange"
            range-separator="至"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="订单发货开始时间"
            end-placeholder="订单发货结束时间"
            :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </div>

        <div class="search-form-item" v-if="isSpread">
          <el-date-picker
            v-model="listQuery.completion_time"
            class="inp"
            style="width: auto"
            type="datetimerange"
            range-separator="至"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="订单完成开始时间"
            end-placeholder="订单完成结束时间"
            :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </div>
        <el-button
          class="inp"
          type="primary"
          :loading="agLoading"
          @click="handleFilter"
          icon="el-icon-search"
        >查询</el-button>
        <el-button
          class="inp"
          :loading="agLoading"
          @click="handleReset"
          icon="el-icon-refresh"
        >清空</el-button>

        <i
          @click="handleSpread"
          class="expand"
          :class="`el-icon-arrow-${isSpread ? 'up' : 'down'}`"
        ></i>
      </div>
      <div class="button-operation admin-mt-10">
        <el-button type="primary" plain @click="handleAdd">添加订单</el-button>
        <el-button
          :disabled="disabled"
          :loading="btnLoading"
          type="primary"
          plain
          @click="handleDele()"
        >批量删除</el-button>
        <!-- <el-button type="primary" plain @click="handleSend">批量发货</el-button> -->
        <!-- <el-button type="primary" plain @click="handleAdd">回收站</el-button> -->
        <!-- <el-button
          type="primary"
          class="export"
          plain
          @click="handleExport"
        >导出</el-button> -->
      </div>
      <div ref="gridList" flex-box="1" class="grid-list admin-mt-10">
        <el-table
          class="grid-table"
          border
          stripe
          :data="gridList"
          :height="tableHeight"
          :row-height="55"
          tooltip-effect="dark"
          @selection-change="onRowSelected"
          v-loading="agLoading"
        >
          <el-table-column type="selection" width="35" fixed></el-table-column>
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
          <el-table-column label="操作" fixed="right" width="180">
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
                <el-button
                  icon="el-icon-delete"
                  type="text"
                  @click="handleDele(row, 'single')"
                >删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <admin-pagination
        slot="footer"
        class="footer-page"
        :page="listQuery.pageIndex"
        :limit="listQuery.pageSize"
        :total="total"
        @change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { list, dele } from '@/api/free-mall/order-list.js'
import pagination from '@/mixins/pagination'

const baseQuery = {
  type: 'order_no',
  content: '',
  pay_status: '',
  distribution_status: '',
  status: '',
  order_amount_down: '',
  order_amount_up: '',
  create_time: null,
  send_time_start: null,
  completion_time_start: null
}

export default {
  name: 'DelaMallGoods',
  components: {},
  mixins: [pagination],
  props: {},
  data() {
    return {
      gridList: [],
      listQuery: cloneDeep(baseQuery),
      tableListText: [
        { name: 'order_no', text: '订单号', width: '120' },
        { name: 'accept_name', text: '收货人', width: '120' },
        { name: 'pay_text', text: '支付状态', width: '100' },
        { name: 'distribution_text', text: '发货状态', width: '100' },
        { name: 'order_text', text: '订单状态', realWidth: '100' },
        { name: 'payment_name', text: '支付方式', realWidth: '100' },
        { name: 'user_name', text: '用户名', realWidth: '120' },
        { name: 'create_time', text: '下单时间', realWidth: '180' }
      ],
      btnLoading: false,
      typeOptions: [
        { label: '订单号', key: 'order_no' },
        { label: '收件人姓名', key: 'accept_name' },
        { label: '收件人电话', key: 'accept_mobile' }
      ],
      statusOptions: [
        { key: 1, label: '新订单' },
        { key: 2, label: '确认订单' },
        { key: 3, label: '取消订单' },
        { key: 4, label: '作废订单' },
        { key: 5, label: '完成订单' },
        { key: 6, label: '退款' },
        { key: 7, label: '部分退款' }
      ],
      pay_statusOptions: [
        { key: 0, label: '未支付' },
        { key: 1, label: '已支付' }
      ],
      distribution_statusOptions: [
        { key: 0, label: '未发货' },
        { key: 1, label: '已发货' },
        { key: 2, label: '部分发货' }
      ]
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleDetail(row) {
      this.$router.push(`/dela-mall/order-list/page/detail/${row.id}`)
    },
    handleEdit(row) {
      this.$router.push(`/dela-mall/order-list/page/edit/${row.id}`)
    },
    handleSend() {},
    handleDele(item, type = 'more') {
      const ids = (type === 'single' ? [item] : this.selectRowData)
        .map((c) => c.id)
      const baseObj = { more: this, single: item }[type]
      const content = '确定删除当前选中商品吗？'
      this.$confirm(content, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          baseObj.btnLoading = true
          dele({ id: ids })
            .then((res) => {
              baseObj.btnLoading = false
              this.$message({
                showClose: true,
                message: `删除成功！`,
                type: 'success'
              })
              this.handleFilter()
            })
            .catch(() => {
              baseObj.btnLoading = false
            })
        })
        .catch(() => {})
    },
    handleAdd() {
      this.$router.push('/dela-mall/order-list/page/add')
    },
    handleReset() {
      Object.assign(this.listQuery, cloneDeep(baseQuery))
      this.handleFilter()
    },

    handleData(item) {
      return item
    },
    getList() {
      this.agLoading = true
      const {
        type,
        content,
        pay_status,
        distribution_status,
        status,
        order_amount_down,
        order_amount_up,
        create_time,
        send_time,
        completion_time,

        pageSize,
        pageIndex
      } = this.listQuery
      const sendData = {
        'search[type]': type,
        'search[content]': content,
        pay_status,
        distribution_status,
        status,
        order_amount_down,
        order_amount_up,

        page: pageIndex,
        limit: pageSize,
        paging: true,
        type: 'package'
      }

      if (create_time && create_time.length) {
        sendData.create_time_start = create_time[0]
        sendData.create_time_end = create_time[1]
      }
      if (send_time && send_time.length) {
        sendData.send_time_start = send_time[0]
        sendData.send_time_end = send_time[1]
      }
      if (completion_time && completion_time.length) {
        sendData.completion_time_start = completion_time[0]
        sendData.completion_time_end = completion_time[1]
      }

      list(sendData)
        .then((res) => {
          this.agLoading = false
          const { data, totalPage } = res
          Object.assign(this, {
            selectRowData: [],
            gridList: (data || []).map((c) => {
              c.btnLoading = false
              return this.handleData(c)
            }),
            total: totalPage
          })
        })
        .catch(() => {
          this.agLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input--small .el-input__inner {
  height: 30px;
  line-height: 30px;
}
</style>
