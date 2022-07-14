<template>
  <div class="grid-table">
    <div class="grid-body" flex="dir:top">
      <div class="button-operation">
        <!-- admin-mt-10 -->
        <el-button type="primary" plain @click="handleAdd">添加分类</el-button>
      </div>
      <div ref="gridList" flex-box="1" class="grid-list admin-mt-10">
        <el-table
          class="grid-table"
          border
          stripe
          default-expand-all
          row-key="id"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
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
              <div v-if="item.name === 'sort'">
                <input-cleave
                  v-model="row.sort"
                  placeholder="排序"
                  @blur="handleSort(row)"
                ></input-cleave>
              </div>
              <div v-else-if="item.name === 'img'" class="goods-td">
                <el-image
                  class="goods-td-image"
                  style="height: auto"
                  :src="row.img"
                  fit="contain"
                  :preview-src-list="[row.img]"
                ></el-image>
              </div>
              <span v-else>{{ row[item.name] | fill }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="120">
            <template slot-scope="{ row }">
              <div class="grid-handle-list">
                <el-button
                  icon="el-icon-edit"
                  type="text"
                  :loading="row.btnLoading"
                  @click="handleEdit(row)"
                >编辑</el-button>
                <el-button
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
    </div>
    <add-dialog
      :info="addDialog"
      @update="handleUpdate"
      :options="gridList"
    ></add-dialog>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { getCategoryList, dele, edit } from '@/api/sys-manage/class-list'
import pagination from '@/mixins/pagination'

import AddDialog from './components/add-dialog.vue'

const baseQuery = {}

export default {
  name: 'SysManageClass',
  components: { AddDialog },
  mixins: [pagination],
  props: {},
  data() {
    return {
      listQuery: cloneDeep(baseQuery),
      tableListText: [
        { name: 'name', text: '名称', width: '100' },
        // { name: 'img', text: '图片', width: '200' },
        { name: 'sort', text: '排序', width: '200' }
      ],
      btnLoading: false,
      addDialog: {
        visible: false
      }
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleSort(row) {
      const { id, parent_id, name, sort } = row
      const sendData = {
        id,
        parent_id,
        name,
        sort,
        visibility: 1
      }
      edit(sendData)
    },
    handleDele(item, type = 'more') {
      const ids = (type === 'single' ? [item] : this.selectRowData)
        .map((c) => c.id)
        .join(',')
      const baseObj = { more: this, single: item }[type]
      const content = '确定删除当前后台用户吗？'
      this.$confirm(content, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          baseObj.btnLoading = true
          dele({ cat_id: ids })
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
    handleReturn() {},
    handleEdit(data) {
      Object.assign(this.addDialog, {
        visible: true,
        isEdit: 1,
        data
      })
    },
    handleUpdate(isEdit) {
      isEdit ? this.getList() : this.handleFilter()
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
      item.label = item.name
      item.children?.map(this.handleData)
      return item
    },
    getList() {
      this.agLoading = true
      const sendData = {}
      getCategoryList(sendData)
        .then((res) => {
          this.agLoading = false
          Object.assign(this, {
            selectRowData: [],
            gridList: (res || []).map((c) => {
              c.btnLoading = false
              return this.handleData(c)
            })
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
