<template>
  <div class="grid-table">
    <div class="grid-body" flex="dir:top">
      <div class="search">
        <div class="search-form-item">
          <el-select class="inp" v-model="listQuery.type" placeholder="请选择">
            <el-option
              v-for="item in typeOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            >
            </el-option>
          </el-select>
          <el-input
            class="inp"
            v-model="listQuery.content"
            placeholder="请输入用户名"
            clearable
          />
        </div>
        <div class="search-form-item">
          <el-date-picker
            v-model="listQuery.create_time"
            class="inp"
            style="width: auto"
            type="datetimerange"
            range-separator="至"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
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
      </div>
      <!-- <div class="button-operation admin-mt-10">
        <el-button type="primary" plain @click="handleAdd">提现</el-button>
      </div> -->

      <div class="button-operation admin-mt-10">
        <download-excel
        v-if="permission('UserCenterWithdrawalRecord_export')"

          class="export"
          style="float: right"
          :fields="json_fields"
          worksheet="My Worksheet"
          :fetch="handleExport"
          name="提现列表"
        >
          <el-button type="primary" class="export" plain>导出</el-button>
        </download-excel>
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
              <span>{{ row[item.name] | fill }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="permission('UserCenterWithdrawalRecord_agree') || permission('UserCenterWithdrawalRecord_refuse') || permission('UserCenterWithdrawalRecord_dele')"

            label="操作"
            fixed="right"
            width="180"
          >
            <template slot-scope="{ row }">
              <div class="grid-handle-list">
                <el-button
                  v-if="permission('UserCenterWithdrawalRecord_agree')"

                  icon="el-icon-check"
                  type="text"
                  :disabled="row.status !== '0'"
                  :loading="row.btnLoading"
                  @click="handleSure(row)"
                >同意</el-button>

                <el-button
                  v-if="permission('UserCenterWithdrawalRecord_refuse')"

                  icon="el-icon-close"
                  type="text"
                  :disabled="row.status !== '0'"
                  :loading="row.btnLoading"
                  @click="handleRefuse(row)"
                >拒绝</el-button>

                <el-button
                  v-if="permission('UserCenterWithdrawalRecord_dele')"

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
    <refuse-dialog :info="refuseDialog" @update="handleFilter">
  </refuse-dialog></div>
</template>

<script>
import RefuseDialog from './components/refuse-dialog'
import { cloneDeep } from 'lodash'
import {
  list,
  dele,
  withdrawBatchEdit
} from '@/api/user-center/withdrawal-record.js'
import pagination from '@/mixins/pagination'
import auth from '@/mixins/auth'

const baseQuery = {
  type: 'wait_status',
  content: '',
  create_time: null
}

export default {
  name: 'UserCenterWithdrawalRecord',
  components: {
    RefuseDialog
  },
  mixins: [pagination, auth],
  props: {},
  data() {
    return {
      copy: {},
      listQuery: cloneDeep(baseQuery),
      tableListText: [
        { name: 'username', text: '用户名', width: '100' },
        { name: 'balance', text: '当前预存款', width: '100' },
        { name: 'amount', text: '申请提现金额', width: '100' },
        { name: 'service_free', text: '服务费', width: '100' },
        { name: 'time', text: '	申请时间', width: '100' },
        { name: 'name', text: '收款人姓名', width: '100' },
        { name: 'card_num', text: '银行卡号', width: '100' },
        { name: 'bank', text: '银行', width: '100' },
        { name: 'bank_branch', text: '银行名称', width: '200' },
        { name: 'bank_address', text: '银行地址', width: '200' },

        { name: 'note', text: '备注', width: '200' },
        { name: 'finish_time', text: '完成时间', width: '100' },
        { name: 'statusDesc', text: '状态', width: '100' }
      ],
      btnLoading: false,
      addDialog: {
        visible: false
      },
      refuseDialog: {
        visible: false
      },
      typeOptions: [
        { label: '已处理', key: 'done_status' },
        { label: '未处理', key: 'wait_status' }
      ]
    }
  },
  computed: {
    json_fields() {
      const cur = {
        '用户名': 'username',
        '当前预存款': 'balance',
         '申请提现金额': 'amount',
         '服务费': 'service_free',
         '申请时间': 'time',
         '收款人姓名': 'name',
         '银行卡号': 'card_num',
         '银行': 'bank',
         '银行名称': 'bank_branch',
         '银行地址': 'bank_address',
         '备注': 'note',
         '完成时间': 'finish_time',
         '状态': 'statusDesc'
      }
      return cur
    }
  },
  created() {},
  mounted() {},
  methods: {
    async handleExport() {
      this.copy.limit = 1000000
      this.copy.page = 1
      const res = await list(this.copy)
      return res.data.map(c => {
        return this.handleData(c)
      })
    },
    handleRefuse(row) {
      Object.assign(this.refuseDialog, {
        visible: true,
        data: row
      })
    },
    async handleSure(row) {
      const content = `确定用户[${row.username}(${row.name})]已提现[${row.amount}]元吗（线下转账）？`
      await this.$confirm(content, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      this.btnLoading = true
      const sendData = {
        ids: [row.id],
        type: 'offline'
      }
      try {
        await withdrawBatchEdit(sendData)
        this.btnLoading = false

        this.$message.success('操作成功！')
      } catch (e) {
        this.btnLoading = false
      }
    },
    handleDele(item, type = 'more') {
      const ids = (type === 'single' ? [item] : this.selectRowData)
        .map((c) => c.id)
        .join(',')
      const baseObj = { more: this, single: item }[type]
      const content = '确定删除当前后用户吗？'
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
    handleUpdate(isEdit) {
      isEdit ? this.getList() : this.handleFilter()
    },
    handleAdd() {
      this.$message.warning('待开发')
    },
    handleReset() {
      Object.assign(this.listQuery, cloneDeep(baseQuery))
      this.handleFilter()
    },

    handleData(item) {
      item.statusDesc = { 0: '未处理', 2: '已同意' }[item.status]
      item.bank_address = item.province_text + '-' + item.city_text
      return item
    },
    getList() {
      this.agLoading = true
      const { type, pageSize, pageIndex, create_time } = this.listQuery
      const sendData = {
        type,
        page: pageIndex,
        limit: pageSize,
        paging: true
      }
      if (create_time && create_time.length) {
        sendData.start_time = create_time[0]
        sendData.end_time = create_time[1]
      } else {
        sendData.start_time = undefined
        sendData.end_time = undefined
      }
      list(sendData)
        .then((res) => {
          this.copy = cloneDeep(sendData)
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
