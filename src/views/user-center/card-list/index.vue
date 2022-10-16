<template>
  <div class="grid-table">
    <div class="grid-body" flex="dir:top">
      <div class="search">
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
      </div>
      <div class="button-operation admin-mt-10">
        <download-excel
        v-if="permission('UserCenterCard_export')"

          class="export"
          style="float: right"
          :fields="json_fields"
          worksheet="My Worksheet"
          :fetch="handleExport"
          name="用户银行卡列表"
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
              <div
                v-if="
                  ['front_img', 'back_img'].indexOf(item.name) > -1
                "
                class="goods-td"
              >
                <el-image
                  class="goods-td-image"
                  :src="row[item.name]"
                  fit="contain"
                  :preview-src-list="[row[item.name]]"
                ></el-image>
              </div>

              <span v-else>{{ row[item.name] | fill }}</span>
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
import { list } from '@/api/user-center/card-list'
import pagination from '@/mixins/pagination'
import auth from '@/mixins/auth'

const baseQuery = {
  username: ''
}

export default {
  name: 'UserCenterCard',
  mixins: [pagination, auth],

  props: {},
  data() {
    return {
      copy: {},
      listQuery: cloneDeep(baseQuery),
      tableListText: [
        { name: 'username', text: '用户', width: '100' },
        { name: 'mobile', text: '手机号', width: '100' },
        { name: 'card_num', text: '银行卡号', width: '100' },
        { name: 'bank', text: '银行', width: '100' },
        { name: 'bank_branch', text: '开户银行', width: '100' },

        { name: 'front_img', text: '身份证正面', width: '100' },
        { name: 'back_img', text: '身份证反面', width: '100' },
        { name: 'time', text: '创建时间', width: '200' }
      ],
      btnLoading: false,
      addDialog: {
        visible: false
      }
    }
  },
  computed: {
    json_fields() {
      const cur = {
        '用户': 'username',
        '手机号': 'mobile',
         '银行卡号': 'card_num',
         '银行': 'bank',
         '开户银行': 'bank_branch',
         '创建时间': 'time'
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
    handleReset() {
      Object.assign(this.listQuery, cloneDeep(baseQuery))
      this.handleFilter()
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
