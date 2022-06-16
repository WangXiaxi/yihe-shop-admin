<template>
  <div class="grid-table">
    <div class="grid-body" flex="dir:top">
      <div class="search">
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
      </div>
      <div class="button-operation admin-mt-10">
        <el-button type="primary" plain @click="handleAdd">新增</el-button>
        <el-button
          :disabled="disabled"
          :loading="btnLoading"
          type="primary"
          plain
          @click="handleDele()"
        >批量删除</el-button>
        <el-button
          :disabled="disabled"
          :loading="btnLoading"
          type="primary"
          plain
          @click="handleChange"
        >修改状态</el-button>
        <!-- <el-button type="primary" plain @click="handleAdd">回收站</el-button> -->
        <!-- <el-button type="primary" class="export" plain @click="handleImport">导入</el-button> -->
        <!-- <el-button type="primary" class="export" plain @click="handleExport">导出</el-button> -->
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
                  <div class="goods-td-name">{{ row.name }}</div>
                </div>
              </div>

              <div v-else-if="item.name === 'status'">
                <el-select
                  v-model="row.is_del"
                  placeholder="请选择"
                  @change="handleChangeDel(row)"
                >
                  <el-option
                    v-for="items in statusOptions"
                    :key="items.key"
                    :label="items.label"
                    :value="items.key"
                  >
                  </el-option>
                </el-select>
              </div>

              <div v-else-if="item.name === 'sort'">
                <input-cleave
                  v-model="row.sort"
                  placeholder="排序"
                  @blur="handleSort(row)"
                ></input-cleave>
              </div>

              <span v-else>{{ row[item.name] | fill }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="90">
            <template slot-scope="{ row }">
              <div class="grid-handle-list">
                <!-- <el-button
                  icon="el-icon-edit"
                  type="text"
                  :loading="row.btnLoading"
                  @click="handleEdit(row)"
                >更改价格</el-button> -->
                <el-button
                  icon="el-icon-edit"
                  type="text"
                  :loading="row.btnLoading"
                  @click="handleEdit(row)"
                >编辑</el-button>

                <el-button
                  style="margin-left: 0"
                  icon="el-icon-delete"
                  type="text"
                  :loading="row.btnLoading"
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
    <status-dialog :info="statusDialog" @update="getList"></status-dialog>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { list, dele, editGoodsStatus, editGoodsSortByID } from '@/api/free-mall/goods-list'
import pagination from '@/mixins/pagination'
import StatusDialog from './components/status-dialog.vue'

const baseQuery = {
  type: 'name',
  content: ''
}

export default {
  name: 'FreeMallGoods',
  components: { StatusDialog },
  mixins: [pagination],
  props: {},
  data() {
    return {
      gridList: [],
      listQuery: cloneDeep(baseQuery),
      tableListText: [
        { name: 'goods_no', text: '货号', width: '120' },
        { name: 'goods', text: '商品名称', width: '200' },
        { name: 'sell_price', text: '销售价', width: '100' },
        { name: 'market_price', text: '市场价', width: '100' },
        { name: 'store_nums', text: '库存', width: '120' },
        { name: 'status', text: '状态', realWidth: '100' },
        { name: 'sort', text: '排序', realWidth: '100' }
      ],
      typeOptions: [
        { label: '商品名称', key: 'name' },
        { label: '货号', key: 'goods_no' }
      ],
      btnLoading: false,
      statusOptions: [
        { label: '正常', key: '0' },
        { label: '下架', key: '2' }
      ],
      statusDialog: {
        visible: false
      }
    }
  },
  computed: {},
  mounted() {},
  created() {
    this.$bus.on('FreeMallGoodsUpdate', this.handleFilter)
  },
  beforeDestroy() {
    this.$bus.off('FreeMallGoodsUpdate')
  },
  methods: {
    handleDele(item, type = 'more') {
      const ids = (type === 'single' ? [item] : this.selectRowData)
        .map((c) => c.id)
        .join(',')
      console.log(ids)
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
    handleImport() {},
    handleExport() {},
    handleChange() {
      Object.assign(this.statusDialog, {
        visible: true,
        data: this.selectRowData
      })
    },
    handleChangeDel(row) {
      const sendData = {
        id: [row.id],
        type: { 0: 'up', 2: 'down' }[row.is_del]
      }
      editGoodsStatus(sendData).then((res) => {
        this.$message({
          showClose: true,
          message: `操作成功！`,
          type: 'success'
        })
      })
    },
    handleSort(row) {
      const sendData = {
        id: [row.id],
        sort: row.sort
      }
      editGoodsSortByID(sendData)
    },
    handleEdit(row) {
      this.$router.push(`/free-mall/goods-list/page/edit/${row.id}`)
    },
    handleAdd() {
      this.$router.push('/free-mall/goods-list/page/add')
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
      const { type, content, pageSize, pageIndex } = this.listQuery
      const sendData = {
        'search[type]': type,
        'search[content]': content,
        page: pageIndex,
        limit: pageSize,
        paging: true
      }
      list(sendData)
        .then((res) => {
          this.agLoading = false
          const { data, curPage } = res
          Object.assign(this, {
            selectRowData: [],
            gridList: (data || []).map((c) => {
              c.goodsNoDesc = c.goods_no.split('-')[0]
              c.btnLoading = false
              return this.handleData(c)
            }),
            total: curPage
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
