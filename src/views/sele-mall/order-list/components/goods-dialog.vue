<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="info.visible"
    append-to-body
    class="setting-dialog"
    :title="`选择商品`"
    v-el-drag-dialog
    width="900px"
  >
    <div class="app-main">
      <div class="search m-l-0">
        <div class="search-form-item">

          <el-select
            class="inp select-types m-l-0"
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
        >查询</el-button>
      </div>
      <el-table
        :data="gridList"
        @select="handleSelectionChange"
        @select-all="handleSelectionChange"
        border
        height="300"
        ref="table"
        class="grid-list admin-mt-10 grid-table"
        :class="{ 'single-table': type === 'single' }"
        v-loading="agLoading"
        :header-cell-style="{
          color: '#303133',
          padding: '5px 0',
          'background-color': '#f5f7fb'
        }"
      >
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column
          label="序号"
          type="index"
          width="100"
        ></el-table-column>
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
                <div class="goods-td-name">{{ row.goodsName }}</div>
              </div>
            </div>

            <span v-else>{{ row[item.name] | fill }}</span>
          </template>
        </el-table-column>
      </el-table>
      <admin-pagination
        slot="footer"
        class="footer-page"
        :page="listQuery.pageIndex"
        :limit="listQuery.pageSize"
        :total="total"
        @change="handlePageChange"
      />
      <div
        class="choosed-list"
        v-show="selectRowData.length && type === 'multiple'"
      >
        <div class="table-title">已选择</div>
        <!-- 选择管理员 -->
        <choose-list :list.sync="selectRowData" @deleteItem="removeItem" />
      </div>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click.native="dialogClose">取 消</el-button>
      <el-button
        :loading="btnLoading"
        type="primary"
        @click.native="handleSure"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getGoodsSearchList } from '@/api/free-mall/goods-list'
import pagination from '@/mixins/pagination'

const fields = {
  type: 'name',
  content: ''
}

export default {
  mixins: [pagination], // 分页通用方法 参数

  props: {
    type: {
      // single multiple
      type: String,
      default: 'single'
    },
    info: {
      // 传入对象 方便父子组件传值
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      needAddQuery: false,
      firstLoading: false,
      btnLoading: false,
      categoryIdOptions: [],
      tableListText: [
        { name: 'goods_no', text: '货号', width: '120' },
        { name: 'goods', text: '商品名称', width: '200' },
        { name: 'sell_price', text: '销售价', width: '100' },
        { name: 'store_nums', text: '库存', width: '120' }
      ],
      typeOptions: [
        { label: '商品名称', key: 'name' },
        { label: '货号', key: 'goods_no' }
      ],
      listQuery: JSON.parse(JSON.stringify(fields))
    }
  },
  watch: {
    'info.visible'(n) {
      // 用监听变化 来控制是获取数据还是清除 比用方法触发更加集中化
      if (n) {
        this.getdetail()
      } else {
        setTimeout(this.cleared, 300)
      }
    }
  },
  created() {},
  methods: {
    removeItem(item) {
      const cur = this.gridList.find((c) => item.id === c.id)
      if (cur) this.$refs.table.toggleRowSelection(cur)
    },

    // 关闭窗口
    dialogClose() {
      this.info.visible = false // 关闭
    },
    // 清楚数据
    cleared() {
      this.listQuery = JSON.parse(JSON.stringify(fields))
      this.total = 0
      this.agLoading = false
      this.btnLoading = false
      this.selectRowData = []
    },
    handleSelectionChange(v, x) {
      if (this.type === 'single') {
        this.selectRowData = [x]
        this.gridList.map((c) => {
          if (c.id !== x.id) {
            this.$refs.table.toggleRowSelection(c, false)
          }
        })
        return
      }
      const selectRowData = this.selectRowData // 当前选中
      const gridList = this.gridList
      if (x === undefined && v.length > 0) {
        // 全选时
        // 全选操作
        const needList = v.filter((c) => {
          const index = selectRowData.findIndex((j) => j.id === c.id)
          return index === -1
        })

        selectRowData.push(...needList)
        return
      }
      if (x === undefined && v.length === 0) {
        // 全不选时
        // 全选操作
        gridList.forEach((c) => {
          const index = selectRowData.findIndex((j) => j.id === c.id)
          if (index > -1) {
            selectRowData.splice(index, 1)
          }
        })
        return
      }
      if (x) {
        const isAdd = v.find((c) => c.id === x.id)
        console.log(isAdd)
        if (isAdd) {
          // 新增
          selectRowData.push(x)
          return
        }
        if (!isAdd) {
          // 删除
          const index = selectRowData.findIndex((j) => j.id === x.id)
          if (index > -1) {
            selectRowData.splice(index, 1)
          }
          return
        }
      }
    },
    // 确定
    handleSure() {
      if (!this.selectRowData.length) return this.$message.error('请选择商品！')
      this.$emit('update', this.selectRowData)
      this.dialogClose()
    },
    getdetail() {
      this.handleFilter()
      if (this.type === 'multiple') {
        this.selectRowData = JSON.parse(JSON.stringify(this.info.list))
      }
      this.setSelectRow()
    },
    setSelectRow() {
      if (this.type === 'multiple') {
        this.$nextTick(() => {
          this.gridList.map((c) => {
            const cur = this.selectRowData.find((j) => j.id === c.id)
            if (cur) this.$refs.table.toggleRowSelection(c)
          })
        })
      }
      if (this.type === 'single') {
        this.selectRowData = []
      }
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
        is_products: 1,
        paging: true,
        type: 'preference'
      }
      getGoodsSearchList(sendData)
        .then((res) => {
          this.agLoading = false
          const { data, totalPage } = res
          Object.assign(this, {
            gridList: (data || []).map((c) => {
              c.goodsName = c.name
              c.name = c.goods_no
              c.id = c.product_id
              c.btnLoading = false
              return this.handleData(c)
            }),
            total: totalPage
          })

          this.setSelectRow()
        })
        .catch(() => {
          this.agLoading = false
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.m-l-0 {
  margin-left: 0 !important;
}
.single-table ::v-deep th.el-table-column--selection .el-checkbox__input {
  display: none;
}
</style>
