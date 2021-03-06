<template>
  <div class="grid-table">
    <div class="grid-body" flex="dir:top">
      <div class="search">
        <div class="search-form-item">
          <el-select
            class="inp "
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
            class="inp "
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
      <div class="button-operation admin-mt-10">
        <el-button type="primary" plain @click="handleAdd">提现</el-button>
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
          <el-table-column label="操作" fixed="right" width="120">
            <template slot-scope="{ row }">
              <div class="grid-handle-list">
                <!-- <el-button
                  icon="el-icon-edit"
                  type="text"
                  :loading="row.btnLoading"
                  @click="handleEdit(row)"
                >编辑</el-button> -->
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
import { list, dele } from '@/api/user-center/withdrawal-record.js'
import pagination from '@/mixins/pagination'

const baseQuery = {
  type: 'wait_status',
  content: ''
}

export default {
  name: 'UserCenterUser',
  components: {},
  mixins: [pagination],
  props: {},
  data() {
    return {
      listQuery: cloneDeep(baseQuery),
      tableListText: [
        { name: 'username', text: '用户名', width: '100' },
        { name: 'true_name', text: '当前预存款', width: '100' },
        { name: 'sexDesc', text: '申请提现金额', width: '100' },
        { name: 'balance', text: '	申请时间', width: '100' },
        { name: 'exp', text: '收款人姓名', width: '100' },
        { name: 'point', text: '微信绑定', width: '100' },
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
    handleEdit(data) {
      this.$router.push(`/user-center/user-list/page/edit/${data.user_id}`)
    },
    handleUpdate(isEdit) {
      isEdit ? this.getList() : this.handleFilter()
    },
    handleAdd() {
      this.$router.push('/user-center/user-list/page/add')
    },
    handleReset() {
      Object.assign(this.listQuery, cloneDeep(baseQuery))
      this.handleFilter()
    },

    handleData(item) {
      item.sexDesc = this.sexOptions.find((c) => c.key === item.sex)?.label
      item.statusDesc = this.statusOptions.find(
        (c) => c.key === item.status
      )?.label
      return item
    },
    getList() {
      this.agLoading = true
      const {
        type,
        pageSize,
        pageIndex
      } = this.listQuery
      const sendData = {
  type,
        page: pageIndex,
        limit: pageSize,
        paging: true
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
