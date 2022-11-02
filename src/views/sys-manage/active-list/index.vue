<template>
  <div class="grid-table">
    <div class="grid-body" flex="dir:top">
      <!-- <div class="search">
        <div class="search-form-item">
          <el-select
            class="inp select-types"
            style="width: 100px"
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
      <div class="button-operation">
        <el-button
          v-if="permission('SysManageActive_add')"
          type="primary"
          plain
          @click="handleAdd"
        >添加活动商品</el-button>
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
              <div v-if="item.name === 'goods'" class="goods-td">
                <el-image
                  class="goods-td-image"
                  :src="row.img"
                  fit="contain"
                  :preview-src-list="[row.img]"
                ></el-image>
                <div class="goods-td-info">
                  <div class="goods-td-name">{{ row.goods_name }}</div>
                </div>
              </div>
              <span v-else>{{ row[item.name] | fill }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="90"
            v-if="permission('SysManageActive_dele')"
          >
            <template slot-scope="{ row }">
              <div class="grid-handle-list">
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
    <add-dialog :info="addDialog" @update="handleFilter"></add-dialog>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { list, dele } from '@/api/sys-manage/active-list'
import pagination from '@/mixins/pagination'
import auth from '@/mixins/auth'
import AddDialog from './components/add-dialog'

const baseQuery = {
  type: 'name',
  content: ''
}

export default {
  name: 'SysManageActive',
  mixins: [pagination, auth],
  components: { AddDialog },
  props: {},
  data() {
    return {
      gridList: [],
      listQuery: cloneDeep(baseQuery),
      tableListText: [
        { name: 'goods_no', text: '货号', width: '120' },
        { name: 'goods', text: '商品名称', width: '200' },
        { name: 'point_price', text: '活动积分', width: '100' },
        { name: 'store_nums', text: '库存', width: '120' }
      ],
      btnLoading: false,
      statusOptions: [
        { label: '正常', key: '0' },
        { label: '下架', key: '2' }
      ],
      addDialog: {
        visible: false
      }
    }
  },
  computed: {},
  mounted() {},
  created() {
    this.$bus.on('SeleMallGoodsUpdate', this.handleFilter)
  },
  beforeDestroy() {
    this.$bus.off('SeleMallGoodsUpdate')
  },
  methods: {
    handleDele(item, type = 'more') {
      const ids = (type === 'single' ? [item] : this.selectRowData)
        .map((c) => c.id)
        .join(',')
      const baseObj = { more: this, single: item }[type]
      const content = '确定删除当前选中活动商品吗？'
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
    handleImport() {},
    handleExport() {},

    handleEdit(row) {
      Object.assign(this.addDialog, {
        visible: true,
        isEdit: 1,
        data: row
      })
    },
    handleAdd() {
      Object.assign(this.addDialog, {
        visible: true,
        isEdit: 0
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
      const { pageSize, pageIndex } = this.listQuery
      const sendData = {
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
              c.goodsNoDesc = c.goods_no.split('-')[0]
              c.statusDesc = this.statusOptions.find(j => j.key === c.is_del)?.label
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
