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
          <el-table-column
            v-if="permission('UserCenterWithdrawalRecord_agree') || permission('UserCenterWithdrawalRecord_dele')"

            label="操作"
            fixed="right"
            width="120"
          >
            <template slot-scope="{ row }">
              <div class="grid-handle-list">
                <el-button
                  v-if="permission('UserCenterWithdrawalRecord_agree')"

                  icon="el-icon-edit"
                  type="text"
                  :disabled="row.status !== '0'"
                  :loading="row.btnLoading"
                  @click="handleSure(row)"
                >同意</el-button>
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
  </div>
</template>

<script>
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
  content: ''
}

export default {
  name: 'UserCenterWithdrawalRecord',
  components: {},
  mixins: [pagination, auth],
  props: {},
  data() {
    return {
      listQuery: cloneDeep(baseQuery),
      tableListText: [
        { name: 'username', text: '用户名', width: '100' },
        { name: 'balance', text: '当前预存款', width: '100' },
        { name: 'amount', text: '申请提现金额', width: '100' },
        { name: 'time', text: '	申请时间', width: '100' },
        { name: 'name', text: '收款人姓名', width: '100' },
        { name: 'card_num', text: '银行卡号', width: '100' },
        { name: 'bank', text: '银行', width: '100' },
        { name: 'bank_branch', text: '银行名称', width: '200' },
        { name: 'statusDesc', text: '状态', width: '100' }
      ],
      btnLoading: false,
      addDialog: {
        visible: false
      },

      typeOptions: [
        { label: '已处理', key: 'done_status' },
        { label: '未处理', key: 'wait_status' }
      ]
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
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
      return item
    },
    getList() {
      this.agLoading = true
      const { type, pageSize, pageIndex } = this.listQuery
      const sendData = {
        type,
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
