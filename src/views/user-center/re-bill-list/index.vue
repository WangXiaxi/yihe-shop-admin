<template>
  <div class="grid-table">
    <div class="grid-body" flex="dir:top">
      <!-- <div class="search">
        <div class="search-form-item">
          <el-input
            class="inp"
            v-model="listQuery.username"
            placeholder="请输入用户"
            clearable
          />
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
      </div> -->
      <!-- admin-mt-10 -->
      <div ref="gridList" flex-box="1" class="grid-list">
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
          <!-- <el-table-column type="selection" width="35" fixed></el-table-column> -->
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
              <el-link
                v-if="item.name === 'order_no'"
                type="primary"
                @click="handleOrderDetail(row)"
                >{{ row[item.name] | fill }}</el-link
              >
              <span v-else>{{ row[item.name] | fill }}</span>
            </template>
          </el-table-column>

          <el-table-column
            v-if="permission('UserCenterReBill_agree') || permission('UserCenterReBill_refuse')"

            label="操作"
            fixed="right"
            width="120"
          >
            <template slot-scope="{ row }">
              <div class="grid-handle-list">
                <el-button
                  v-if="permission('UserCenterReBill_agree')"

                  icon="el-icon-check"
                  type="text"
                  :disabled="row.refundment_text !== '申请中'"
                  :loading="row.btnLoading"
                  @click="handleSure(row, 2)"
                >同意</el-button>
                <el-button
                  v-if="permission('UserCenterReBill_refuse')"
                  :disabled="row.refundment_text !== '申请中'"
                  icon="el-icon-close"
                  type="text"
                  @click="handleSure(row, 1)"
                >拒绝</el-button>
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
    <detail-dialog :info="detailDialog"></detail-dialog>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { list, updateRefundmentById } from '@/api/user-center/re-bill-list'
import pagination from '@/mixins/pagination'
import auth from '@/mixins/auth'
import DetailDialog from './components/detail-dialog'
const baseQuery = {
  username: ''
}

export default {
  name: 'UserCenterReBill',
  mixins: [pagination, auth],
  components: {
    DetailDialog
  },
  props: {},
  data() {
    return {
      listQuery: cloneDeep(baseQuery),
      tableListText: [
        { name: 'username', text: '用户', width: '100' },
        { name: 'order_no', text: '订单号', width: '200' },
        { name: 'amount', text: '申请金额', width: '100' },
        { name: 'refundment_text', text: '申请状态', width: '200' },
        { name: 'time', text: '退款时间', width: '200' },
        { name: 'dispose_time', text: '处理时间', width: '200' }
      ],
      btnLoading: false,
      detailDialog: {
        visible: false
      }
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    async handleSure(row, type) {
      const content = `确定${type === 2 ? '同意' : '拒绝'}当前订单退款吗？`
      await this.$confirm(content, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      this.btnLoading = true
      const sendData = {
        id: row.id,
        pay_status: type
      }
      try {
        await updateRefundmentById(sendData)
        this.btnLoading = false

        this.$message.success('操作成功！')
        this.handleFilter()
      } catch (e) {
        this.btnLoading = false
      }
    },
    handleOrderDetail(row) {
     const typeUrl = {
      free: `/free-mall/order-list/page/detail/${row.order_id}`,
      preference: `/sele-mall/order-list/page/detail/${row.order_id}`,
      package: `/dela-mall/order-list/page/detail/${row.order_id}`
     }
     this.goUrl(typeUrl[row.goods_type])
    },
    goUrl(path) {
      this.$router.push(path)
    },
    handleReset() {
      Object.assign(this.listQuery, cloneDeep(baseQuery))
      this.handleFilter()
    },
    handleDetail(data) {
      Object.assign(this.detailDialog, {
        visible: true,
        data
      })
    },
    handleData(item) {
      item.btnLoading = false
      return item
    },
    getList() {
      this.agLoading = true
      const { pageSize, pageIndex, username } = this.listQuery
      const sendData = {
        'search[username=]': username,
        page: pageIndex,
        limit: pageSize,
        paging: true
      }
      list(sendData)
        .then((res) => {
          this.agLoading = false
          const { data, total } = res
          Object.assign(this, {
            selectRowData: [],
            gridList: (data || []).map((c) => {
              c.btnLoading = false
              return this.handleData(c)
            }),
            total: total
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
